import * as Yup from 'yup';
import { isBefore, subHours, addHours } from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';
import File from '../models/File';

import Queue from '../../lib/Queue';

import SubscriberMail from '../jobs/SubscriberMail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: {
              [Op.gte]: new Date(),
            },
          },
          include: [
            {
              model: User,
              as: 'organizer',
              attributes: ['name'],
            },
            {
              model: File,
              as: 'file',
              attributes: ['path', 'url'],
            },
          ],
        },
      ],
      order: [[{ model: Meetup, as: 'meetup' }, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      meetup_id: Yup.number().required(),
    });

    const schemaIsValid = await schema.isValid(req.body);
    if (!schemaIsValid) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { meetup_id } = req.body;

    const meetup = await Meetup.findOne({
      where: { id: meetup_id },
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['name', 'email'],
        },
      ],
    });

    // Checks if the user trying to subscribe is the actual organizer of the meetup
    if (meetup.user_id === req.userId) {
      return res
        .status(401)
        .json({ error: 'You can not subscribe to your own meetup!' });
    }

    // Checks if the meetup already happened
    if (isBefore(meetup.date, new Date())) {
      return res.status(401).json({
        error: 'You can not subscribe to a meetup that already happened',
      });
    }

    // Checks if the user already subscribed
    const userAlreadySubscribed = await Subscription.findOne({
      where: { meetup_id, user_id: req.userId },
    });

    if (userAlreadySubscribed) {
      return res
        .status(401)
        .json({ error: 'You are already subscribed to this meetup' });
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
                  subHours(meetup.date, 1),
                  addHours(meetup.date, 1),
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
            [Op.between]: [subHours(meetup.date, 1), addHours(meetup.date, 1)],
          },
        },
      }));

    if (userIsNotAvailable) {
      return res
        .status(401)
        .json({ error: 'You already have a meetup in this hour!' });
    }

    const subscription = await Subscription.create({
      user_id: req.userId,
      meetup_id,
    });

    const subscriber = await User.findByPk(req.userId, {
      attributes: ['name', 'email'],
    });

    await Queue.add(SubscriberMail.key, { meetup, subscriber });

    return res.json(subscription);
  }

  async delete(req, res) {
    const { id } = req.params;
    const subscription = await Subscription.findOne({
      where: {
        id,
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['date'],
        },
      ],
    });

    if (!subscription) {
      return res.status(401).json({ err: 'Invalid ID' });
    }

    if (isBefore(subscription.meetup.date, new Date())) {
      return res.status(401).json({
        err: 'You can not unsubscribe to a meetup that already happened',
      });
    }

    await subscription.destroy();

    return res.json(subscription);
  }
}

export default new SubscriptionController();
