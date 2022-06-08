"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "completedexercises",
      [
        {
          userId: 1,
          exerciseId: 1,
          name: "quarter sit-up",
          bodyPart: "waist",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          exerciseId: 2,
          name: "rear decline bridge",
          bodyPart: "upper legs",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("completedexercises", null, {});
  },
};
