'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "Articles",
      [
        {
          name: "First Article",
          text: "Article about sport",
          isPublished: false,
          CategoryId: 1,
          UserId:  3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Second Article",
          text: "Text about Article",
          isPublished: false,
          CategoryId: 2,
          UserId:  5,
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
    return await queryInterface.bulkInsert("Articles", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
