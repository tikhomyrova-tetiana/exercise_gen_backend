"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      exercise.belongsToMany(models.user, {
        through: "userexercises",
        foreignKey: "exerciseId",
      });
    }
  }
  exercise.init(
    {
      apiId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "exercise",
    }
  );
  return exercise;
};
