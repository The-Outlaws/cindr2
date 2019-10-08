const Sequelize = require('sequelize')
const db = require('../db')

const Answer = db.define('answer', {
  content: {
    type: Sequelize.STRING
  },
  roomRoute: {
    type: Sequelize.INTEGER
  }
})

module.exports = Answer
