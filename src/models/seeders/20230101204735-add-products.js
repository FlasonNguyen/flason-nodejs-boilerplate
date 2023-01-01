'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const products = [];
    for (let i = 0; i < 100; i++) {
      products.push({
          id: faker.datatype.uuid(),
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          image: [faker.image.imageUrl()],
          category: faker.helpers.arrayElement(['FRUIT', 'VEGETABLE', 'CANNED', 'DAIRY', 'MEAT', 'SEAFOOD', 'BAKERY', 'BEVERAGE', 'SNACK', 'FROZEN']),
          stock: faker.datatype.number({ min: 0, max: 100 }),
          rating: faker.datatype.number({ min: 0, max: 5 }),
          numReviews: faker.datatype.number({ min: 0, max: 100 }),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      });
    }
    await queryInterface.bulkInsert('product', products, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product', null, {});
  }
};
