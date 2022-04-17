'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Room, {
        foreignKey: 'roomId',
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Fight.init(
    {
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      choice: {
        type: DataTypes.ENUM('rock', 'paper', 'scissors'),
        allowNull: false,
      },
      round: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Fight',
    }
  );
  return Fight;
};
