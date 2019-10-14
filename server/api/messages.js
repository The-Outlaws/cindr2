const router = require('express').Router();
const { Message, User, Conversation } = require('../db/models');

module.exports = router;

// GET /api/messages
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.findAll();
    console.log(messages);
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// POST /api/messages
router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    // const newMessage = await Message.createMessage(req.body.content, req.user.id, req.match.id)
    const newMessage = await Message.create({
      content: req.body.content,
      userId: req.body.userId
    });
    newMessage.setConversation(req.body.conversationId);
    res.status(201);
    res.json(newMessage);
  } catch (error) {
    next(error);
  }
});

// PUT /api/messages
router.put('/:messageId', async (req, res, next) => {
  try {
    const messageId = req.params.messageId;
    const message = await Message.findById(messageId);
    await message.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// DELETE /api/messages
router.delete('/:messageId', async (req, res, next) => {
  try {
    const id = req.params.messageId;
    await Message.destroy({ where: { id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
