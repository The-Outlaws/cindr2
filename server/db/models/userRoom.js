const Sequelize = require('sequelize');
const db = require('../db');

const UserRoom = db.define('UserRoom', {
  isActive: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = UserRoom;
