const router = require('express').Router();
const { Message, User, Conversation } = require('../db/models');

module.exports = router;

// GET /api/messages
router.get('/', async (req, res, next) => {
  try {
    const conversations = await Conversation.findAll({
      where: {
        userId: req.user.id
      }
    });
    console.log(conversations);
    res.json(conversations);
  } catch (err) {
    next(err);
  }
});
