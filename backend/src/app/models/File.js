import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://${process.env.APP_URL}:5000/files/${this.path}`;
          },
        },
      },
      {
        sequelize: connection,
      }
    );
  }
}

export default File;
