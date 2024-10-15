'use strict';

const { Review } = require('../models');

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: 'Awesome spot!',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Pretty nice!',
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Average',
        stars: 3
      },
      {
        spotId: 4,
        userId: 4,
        review: 'Very messy.',
        stars: 2
      },
      {
        spotId: 5,
        userId: 5,
        review: 'Disgusting!',
        stars: 1
      }
    ], options);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, null, {});
  }
};
