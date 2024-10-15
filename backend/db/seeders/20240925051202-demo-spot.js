'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
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
   await Spot.bulkCreate([
    {
      ownerId: 1,
      address: '123 Oceanview Drive',
      city: 'Santa Monica',
      state: 'California',
      country: 'USA',
      lat: 34.0195,
      lng: -118.4912,
      name: 'Oceanview Paradise',
      description: 'A beautiful beachfront property with stunning ocean views.',
      price: 350.00,
    },
    {
      ownerId: 2,
      address: '456 Mountain Road',
      city: 'Aspen',
      state: 'Colorado',
      country: 'USA',
      lat: 39.1911,
      lng: -106.8175,
      name: 'Mountain Escape',
      description: 'A cozy cabin nestled in the Aspen mountains, perfect for a winter retreat.',
      price: 500.00,
    },
    {
      ownerId: 3,
      address: '789 Sunset Blvd',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
      lat: 34.0522,
      lng: -118.2437,
      name: 'City Lights Loft',
      description: 'A modern loft in downtown LA with incredible city views.',
      price: 275.00,
    },
    {
      ownerId: 2,
      address: '321 Lakeside Avenue',
      city: 'Lake Tahoe',
      state: 'Nevada',
      country: 'USA',
      lat: 39.0968,
      lng: -120.0324,
      name: 'Lakeside Retreat',
      description: 'A tranquil cabin by the lake, perfect for a peaceful getaway.',
      price: 400.00,
    },
    {
      ownerId: 3,
      address: '654 Vineyard Lane',
      city: 'Napa Valley',
      state: 'California',
      country: 'USA',
      lat: 38.2975,
      lng: -122.2869,
      name: 'Vineyard Villa',
      description: 'A luxurious villa surrounded by vineyards in the heart of Napa Valley.',
      price: 600.00,
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
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, null, {});
  }
};
