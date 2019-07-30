import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
  static init(connection) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        date: Sequelize.DATE,
      },
      {
        sequelize: connection,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'organizer' });
    this.belongsTo(models.File, { foreignKey: 'file_id', as: 'file' });
    this.hasMany(models.Subscription, {
      foreignKey: 'meetup_id',
      as: 'subscription',
    });
  }
}

export default Meetup;
