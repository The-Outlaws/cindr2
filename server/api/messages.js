const router = require('express').Router();
const { Message, User, Conversation } = require('../db/models');

module.exports = router;

// GET /api/messages
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      include: [
        {
          model: User
        }
      ]
    });
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// POST /api/messages
router.post('/', async (req, res, next) => {
  try {
    // const newMessage = await Message.createMessage(req.body.content, req.user.id, req.match.id)
    const newMessage = await Message.create({
      content: req.body.content,
      userId: req.body.userId,
      conversationId: req.body.conversationId
    });
    const message = await Message.findByPk(newMessage.id, {
      include: [User]
    });
    res.status(201);
    res.json(message);
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
