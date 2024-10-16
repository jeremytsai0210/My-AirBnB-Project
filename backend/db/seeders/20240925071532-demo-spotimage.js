'use strict';

const { SpotImage } = require('../models');

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
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'image.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'image.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'image.png',
        preview: true
      },
      {
        spotId: 4,
        url: 'image.png',
        preview: true
      },
      {
        spotId: 5,
        url: 'image.png',
        preview: true
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
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
