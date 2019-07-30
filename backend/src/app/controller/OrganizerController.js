import { Op } from 'sequelize';

import Meetup from '../models/Meetup';

class OrganizerController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userId,
        date: {
          [Op.gte]: new Date(),
        },
      },
      attributes: ['id', 'title', 'date'],
    });

    return res.json(meetups);
  }
}

export default new OrganizerController();
