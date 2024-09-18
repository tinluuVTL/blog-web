'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstname: "Jon",
          lastname: "Snow",
          username: "admin",
          password: "password",
          role:  "admin",
          login: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstname: "Rossini",
          lastname: "Frances",
          username: "moderator",
          password: "password",
          role:  "moderator",
          login: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstname: "Harvey",
          lastname: "Roxie",
          username: "member",
          password: "password",
          role:  "member",
          login: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
