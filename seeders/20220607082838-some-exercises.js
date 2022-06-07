"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "exercises",
      [
        {
          apiId: "3201",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          apiId: "0668",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("exercises", null, {});
  },
};
