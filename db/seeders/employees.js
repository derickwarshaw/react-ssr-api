'use strict';
const { Employee } = require('../models')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Employee.bulkCreate([
      {
        name: 'Bob',
        title: 'Owner',
        description: 'Doesnt do a lot...',
        thumbnail: '/assets/profiles/matthew.png',
        photo: '/assets/profiles/matthew.png'
      },
      {
        name: 'Rachel',
        title: 'Cashier',
        description: 'Handles money',
        thumbnail: '/assets/profiles/rachel.png',
        photo: '/assets/profiles/rachel.png'
      },
      {
        name: 'Matthew',
        title: 'Stocker',
        description: 'Who knows',
        thumbnail: '/assets/profiles/matthew.png',
        photo: '/assets/profiles/matthew.png'
      },
      {
        name: 'Elliot',
        title: 'Magician',
        description: 'Drinks too much',
        thumbnail: '/assets/profiles/elliot.jpg',
        photo: '/assets/profiles/elliot.jpg'
      },
      {
        name: 'Bob',
        title: 'Owner',
        description: 'Doesnt do a lot...',
        thumbnail: '/assets/profiles/matthew.png',
        photo: '/assets/profiles/matthew.png'
      },
      {
        name: 'Bob',
        title: 'Owner',
        description: 'Doesnt do a lot...',
        thumbnail: '/assets/profiles/matthew.png',
        photo: '/assets/profiles/matthew.png'
      },
      {
        name: 'Rachel',
        title: 'Cashier',
        description: 'Handles money',
        thumbnail: '/assets/profiles/rachel.png',
        photo: '/assets/profiles/rachel.png'
      },
      {
        name: 'Matthew',
        title: 'Stocker',
        description: 'Who knows',
        thumbnail: '/assets/profiles/matthew.png',
        photo: '/assets/profiles/matthew.png'
      },
      {
        name: 'Elliot',
        title: 'Magician',
        description: 'Drinks too much',
        thumbnail: '/assets/profiles/elliot.jpg',
        photo: '/assets/profiles/elliot.jpg'
      }],
      { validate: true }).catch(errors => {
        console.log(errors)
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Employees', null, {});
  }
};
