const User = require('./user');
const Room = require('./room');
const UserRoom = require('./userRoom');
const Question = require('./question');
const Answer = require('./answer');
const Message = require('./message');
const Conversation = require('./conversation');
const UserMatches = require('./userMatch');
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Question.belongsTo(Room);
Room.hasOne(Question);

Answer.belongsTo(Question);
Question.hasMany(Answer);

Answer.belongsTo(Room, { as: 'roomRoute' });

// User.hasMany(Message);
// Message.belongsTo(User);

Room.belongsToMany(User, { through: 'UserRoom' });
User.belongsToMany(Room, { through: 'UserRoom' });

Answer.belongsToMany(User, { through: 'UserAnswer' });
User.belongsToMany(Answer, { through: 'UserAnswer' });

User.belongsToMany(User, { as: 'match', through: 'Conversation' });

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: 'user' });
Conversation.belongsTo(User, { as: 'match' });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

Message.belongsTo(User);
User.hasMany(Message);

module.exports = {
  User,
  Room,
  UserRoom,
  Question,
  Answer,
  Message,
  Conversation
};
