const router = require('express').Router();
const { Message, User, Conversation } = require('../db/models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

module.exports = router;

// GET /api/messages
router.get('/', async (req, res, next) => {
  try {
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [{ userId: req.user.id }, { matchId: req.user.id }],
        isRejected: false
      },
      include: [
        { model: Message, include: [User] },
        { model: User, as: 'match' },
        { model: User, as: 'user' }
      ],
      order: [[Message, 'updatedAt', 'DESC']]
    });
    res.json(conversations);
  } catch (err) {
    next(err);
  }
});
router.post('/request', async (req, res, next) => {
  const { matchId } = req.body;
  try {
    const [conversation, wasCreated] = await Conversation.findOrCreate({
      where: {
        userId: req.user.id,
        matchId: matchId
      },
      include: [
        { model: Message, include: [User] },
        { model: User, as: 'match' },
        { model: User, as: 'user' }
      ],
      order: [[Message, 'updatedAt', 'DESC']]
    });
    const duplicate = await Conversation.findOne({
      where: {
        userId: matchId,
        matchId: req.user.id
      },
      include: [
        { model: Message, include: [User] },
        { model: User, as: 'match' },
        { model: User, as: 'user' }
      ],
      order: [[Message, 'updatedAt', 'DESC']]
    });
    if (!duplicate) {
      res.json(conversation);
    } else {
      await Conversation.destroy({
        where: {
          userId: req.user.id,
          matchId: matchId
        }
      });
      res.json(duplicate);
    }
  } catch (err) {
    next(err);
  }
});
router.post('/accept', async (req, res, next) => {
  const { isAccepted, isRejected, conversationId } = req.body;
  try {
    const conversation = await Conversation.findOne({
      where: {
        id: conversationId,
        isAccepted: false
      },
      include: [
        { model: Message, include: [User] },
        { model: User, as: 'match' },
        { model: User, as: 'user' }
      ],
      order: [[Message, 'updatedAt', 'DESC']]
    });
    if (!conversation) return res.sendStatus(404);
    const updatedConvo = await conversation.update({
      isAccepted: isAccepted,
      isRejected: isRejected
    });
    res.json(updatedConvo);
  } catch (err) {
    next(err);
  }
});
router.post('/reject', async (req, res, next) => {
  const { isAccepted, isRejected, conversationId } = req.body;
  try {
    const conversation = await Conversation.findOne({
      where: {
        id: conversationId
      },
      include: [
        { model: Message, include: [User] },
        { model: User, as: 'match' },
        { model: User, as: 'user' }
      ],
      order: [[Message, 'updatedAt', 'DESC']]
    });
    if (!conversation) return res.sendStatus(404);
    const updatedConvo = await conversation.update({
      isAccepted: isAccepted,
      isRejected: isRejected
    });
    res.json(updatedConvo);
  } catch (err) {
    next(err);
  }
});
