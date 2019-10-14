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
        [Op.or]: [{ userId: req.user.id }, { matchId: req.user.id }]
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
