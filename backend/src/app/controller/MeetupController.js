import * as Yup from 'yup';
import {
  parseISO,
  isBefore,
  startOfHour,
  addHours,
  subHours,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    const { page = 1, date } = req.query;

    const parsedDate = parseISO(date);

    const meetups = await Meetup.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      limit: 10,
      offset: (page - 1) * 10,
      attributes: [
        'id',
        'title',
        'description',
        'location',
        'date',
        'user_id',
        'file_id',
      ],
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'file',
          attributes: ['path', 'url'],
        },
        {
          model: Subscription,
          as: 'subscription',
          attributes: ['id', 'user_id'],
        },
      ],
    }).map(el => el.get({ plain: true })); // to return just plain objects from the sequelize query

    const response = meetups.map(meetup => {
      return {
        ...meetup,
        subscribed: meetup.subscription.some(sub => sub.user_id === req.userId),
      };
    });

    response.forEach(meetup => delete meetup.subscription);

    return res.json(response);
  }

  async show(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findOne({
      where: {
        user_id: req.userId,
        id,
      },
      include: [
        {
          model: File,
          as: 'file',
        },
      ],
    });

    return res.json({ meetup });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      file_id: Yup.number().required(),
    });

    const schemaIsValid = await schema.isValid(req.body);
    if (!schemaIsValid) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { title, description, location, date, file_id } = req.body;

    // Checks if the date that is being registered already passed or not.
    const parsedDate = startOfHour(parseISO(date));
    const dateHasPassed = isBefore(parsedDate, new Date());

    if (dateHasPassed) {
      return res
        .status(401)
        .json({ error: 'You can not create meetups with passed dates' });
    }

    // Checks if the user already has a meetup in this hour (subcribed or organizer)
    const userIsNotAvailable =
      (await Subscription.findOne({
        where: {
          user_id: req.userId,
        },
        include: [
          {
            model: Meetup,
            as: 'meetup',
            where: {
              date: {
                [Op.between]: [
                  subHours(parsedDate, 1),
                  addHours(parsedDate, 1),
                ],
              },
            },
          },
        ],
      })) ||
      (await Meetup.findOne({
        where: {
          user_id: req.userId,
          date: {
            [Op.between]: [subHours(parsedDate, 1), addHours(parsedDate, 1)],
          },
        },
      }));

    if (userIsNotAvailable) {
      return res
        .status(401)
        .json({ error: 'You already have a meetup in this hour!' });
    }

    const meetup = await Meetup.create({
      title,
      description,
      location,
      date: parsedDate,
      file_id,
      user_id: req.userId,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
      file_id: Yup.number(),
    });

    const schemaIsValid = await schema.isValid(req.body);
    if (!schemaIsValid) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;

    // Checks if the id on the params is valid and gets the meetup
    const meetup = await Meetup.findOne({
      where: { id, user_id: req.userId },
    });

    if (!meetup) {
      return res.status(401).json({ error: 'Invalid ID' });
    }

    // Checks if the meetup already happened
    if (isBefore(meetup.date, new Date())) {
      return res.status(401).json({
        error: 'You can only update meetups that did not happened yet',
      });
    }

    // Checks if the date is valid
    const { date } = req.body;

    if (date) {
      // Checks if the date that is being registered already passed or not.
      const parsedDate = startOfHour(parseISO(date));
      const dateHasPassed = isBefore(parsedDate, new Date());

      if (dateHasPassed) {
        return res
          .status(401)
          .json({ error: 'You can not create meetups with passed dates' });
      }

      // Checks if the user already has a meetup in this hour (subcribed or organizer)
      const userIsNotAvailable =
        (await Subscription.findOne({
          where: {
            user_id: req.userId,
          },
          include: [
            {
              model: Meetup,
              as: 'meetup',
              where: {
                date: {
                  [Op.between]: [
                    subHours(parsedDate, 1),
                    addHours(parsedDate, 1),
                  ],
                },
              },
            },
          ],
        })) ||
        (await Meetup.findOne({
          where: {
            user_id: req.userId,
            id: {
              [Op.ne]: id,
            },
            date: {
              [Op.between]: [subHours(parsedDate, 1), addHours(parsedDate, 1)],
            },
          },
        }));

      if (userIsNotAvailable) {
        return res.status(401).json({
          error: 'You already have a meetup in this hour!',
          meetup: userIsNotAvailable,
        });
      }

      const updatedMeetup = await meetup.update({
        ...req.body,
        date: startOfHour(parseISO(date)),
      });

      return res.json(updatedMeetup);
    }

    const updatedMeetup = await meetup.update(req.body);

    return res.json(updatedMeetup);
  }

  async delete(req, res) {
    const { id } = req.params;

    // Checks if the id on the params is valid and gets the meetup
    const meetup = await Meetup.findOne({
      where: { id, user_id: req.userId },
    });

    if (!meetup) {
      return res.status(401).json({ error: 'Invalid ID' });
    }

    // Checks if the meetup already happened
    if (isBefore(meetup.date, new Date())) {
      return res.status(401).json({
        error: 'You can only delete meetups that did not happened yet',
      });
    }

    await meetup.destroy();

    return res.json(meetup);
  }
}

export default new MeetupController();
