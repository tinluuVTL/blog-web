'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Sport",
          description: "Description about sport",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Movie",
          description: "Description about Movie category",
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
    return await queryInterface.bulkInsert("Categories", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
