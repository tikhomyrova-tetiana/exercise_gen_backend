"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "testuser",
          email: "test@test.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          age: 22,
          gender: "male",
          photo:
            "https://i0.wp.com/i.pinimg.com/474x/58/f2/de/58f2de50bad0fb24c24d4757841d57c4.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "tanya",
          email: "tanya@t.com",
          password: bcrypt.hashSync("t", SALT_ROUNDS),
          age: 29,
          gender: "female",
          photo:
            "https://i0.wp.com/i.pinimg.com/474x/58/f2/de/58f2de50bad0fb24c24d4757841d57c4.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
