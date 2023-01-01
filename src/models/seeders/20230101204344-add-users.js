'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i < 100; i++) {
      users.push({
          id: faker.datatype.uuid(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
        phone: faker.phone.number('+84 ## ### ####'),
        avatar: faker.internet.avatar(),
        role: faker.helpers.arrayElement(['ADMIN', 'USER']),
        login_type: faker.helpers.arrayElement(['EMAIL', 'FACEBOOK', 'GOOGLE']),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      });
    }
    await queryInterface.bulkInsert('user', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
