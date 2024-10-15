'use strict';

const { Booking } = require('../models');

let options = {};
if(process.env.NODE_ENV = 'production') {
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
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: '2024-12-01',
        endDate: '2024-12-31'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2025-12-01',
        endDate: '2025-12-31'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2026-12-01',
        endDate: '2026-12-31'
      },
      {
        spotId: 1,
        userId: 3,
        startDate: '2027-12-01',
        endDate: '2027-12-31'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2028-12-01',
        endDate: '2028-12-31'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, null, {});
  }
};
