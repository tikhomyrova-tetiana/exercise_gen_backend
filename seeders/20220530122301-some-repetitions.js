"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "repetitions",
      [
        {
          time: "20 seconds",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          time: "25 seconds",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          time: "30 seconds",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          time: "35 seconds",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          time: "40 seconds",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          time: "45 seconds",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          time: "50 seconds",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          time: "55 seconds",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          time: "60 seconds",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          time: "10 reps",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          time: "15 reps",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          time: "20 reps",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          time: "25 reps",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          time: "30 reps",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          time: "35 reps",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          time: "40 reps",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("repetitions", null, {});
  },
};
