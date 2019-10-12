const Sequelize = require('sequelize');
const db = require('../db');
const Message = require('./message');
const { Op } = Sequelize;

const Conversation = db.define('conversation', {});

Conversation.findOrCreateConversation = async (userId, matchId) => {
  try {
    const conversation = await Conversation.findOrCreate({
      where: {
        userId: {
          [Op.or]: [userId, matchId]
        },
        matchId: {
          [Op.or]: [userId, matchId]
        }
      },
      include: [Message]
    });
    return conversation;
  } catch (err) {
    console.log(err);
  }
};

module.exports = Conversation;
