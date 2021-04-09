"use strict";
const bcrypt = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        fullname: "Irsyaad Budi",
        email: "irsyaad@email.com",
        password: await bcrypt.hash(
          "password",
          Number(process.env.SALT_ROUND || 10)
        ),
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
