("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userexercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userexercise.belongsTo(models.user, { foreignKey: "userId" });
      userexercise.belongsTo(models.exercise, { foreignKey: "exerciseId" });
    }
  }
  userexercise.init(
    {
      userId: DataTypes.INTEGER,
      exerciseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "userExercise",
    }
  );
  return userexercise;
};
