'use strict';
const { User } = require('../models')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return User.bulkCreate([
      {
        email: 'fake@demo.com',
        password: 'test123'
      },
      {
        email: 'blargh@demo.com',
        password: '321test'
      }],
      { validate: true }).catch(errors => {
        console.log(errors)
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
