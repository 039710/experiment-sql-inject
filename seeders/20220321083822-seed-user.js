"use strict";
const { user } = require("../models");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        username: "admin",
        password: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user",
        password: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const promises = data.map((item) => {
      return user.create(item);
    });
    await Promise.all(promises);
    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
