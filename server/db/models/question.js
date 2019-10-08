const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('question', {
  content: {
    type: Sequelize.STRING
  }
})

module.exports = Question
