'use strict';

const { ReviewImage } = require('../models');

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
    ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'image.png'
      },
      {
        reviewId: 2,
        url: 'image.png'
      },
      {
        reviewId: 3,
        url: 'image.png'
      },
      {
        reviewId: 4,
        url: 'image.png'
      },
      {
        reviewId: 5,
        url: 'image.png'
      }
    ], options)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
