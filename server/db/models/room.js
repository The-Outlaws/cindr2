const Sequelize = require('sequelize');
const db = require('../db');

const Room = db.define('room', {
  name: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: '/CrystalScene.png'
  },
  trollRoom: {
    type: Sequelize.BOOLEAN
  },
  destinationRoom: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Room;
