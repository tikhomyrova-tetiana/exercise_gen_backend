"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class completedexercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      completedexercise.belongsTo(models.user, { foreignKey: "userId" });
      completedexercise.belongsTo(models.exercise, {
        foreignKey: "exerciseId",
      });
    }
  }
  completedexercise.init(
    {
      userId: DataTypes.INTEGER,
      exerciseId: DataTypes.INTEGER,
      name: { type: DataTypes.STRING, allowNull: false },
      bodyPart: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "completedexercise",
    }
  );
  return completedexercise;
};
