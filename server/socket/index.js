const { Message, Conversation } = require('../db/models');
const mobileSockets = {};

module.exports = io => {
  io.on('connection', socket => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    socket.on('new-message', message => {
      socket.broadcast.emit('new-message', message);
    });
    socket.on('message', ({ text, sender, receiver }) => {
      Message.createMessage(text, sender, receiver).then(message => {
        socket.emit('incomingMessage', message);
        const receiverSocketId = mobileSockets[receiver.id];
        socket.to(receiverSocketId).emit('incomingMessage', message);
      });
    });
    socket.on('chat', users => {
      Conversation.findOrCreateConversation(
        users.user.id,
        users.receiver.id
      ).then(conversation =>
        socket.emit('priorMessages', conversation.messages)
      );
    });
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`);
    });
  });
};
