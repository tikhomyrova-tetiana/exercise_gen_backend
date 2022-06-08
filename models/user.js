"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsToMany(models.exercise, {
        through: "userexercises",
        foreignKey: "userId",
      });
      user.belongsToMany(models.exercise, {
        through: "completedexercises",
        foreignKey: "userId",
      });
    }
  }
  user.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      gender: {
        type: DataTypes.STRING,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://i0.wp.com/i.pinimg.com/474x/58/f2/de/58f2de50bad0fb24c24d4757841d57c4.jpg",
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
