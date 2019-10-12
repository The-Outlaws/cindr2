const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');
const Conversation = require('./conversation');

const Message = db.define(
  'message',
  {
    content: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    defaultScope: {
      include: [{ model: User }]
    }
  }
);
Message.createMessage = async (content, sender, receiver) => {
  const [message, conversation] = await Promise.all([
    Message.create({
      content,
      userId: sender.id
    }),
    Conversation.findOrCreateConversation(sender.id, receiver.id)
  ]);
  return message.setConversation(conversation);
};

module.exports = Message;
