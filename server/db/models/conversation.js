const Sequelize = require('sequelize');
const db = require('../db');
const Message = require('./message');
const { Op } = Sequelize;

const Conversation = db.define('conversation', {
  isAccepted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isRejected: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

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
      include: [Message],
      order: [[Message, 'createdAt', 'DESC']]
    });
    return conversation;
  } catch (err) {
    console.log(err);
  }
};
//user sends request to match
//pending request: false, false (default)
//accepted request: true, false
//rejected request: false, true
//accepted, then rejected: true, true (perhaps for deleting/blocking purposes)
module.exports = Conversation;
