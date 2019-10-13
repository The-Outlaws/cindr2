const router = require('express').Router();
const { User, Room } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
      include: [Room]
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/active/:userId', async (req, res, next) => {
  try {
    const roomData = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: [Room]
    });

    res.json(roomData);
  } catch (err) {
    next(err);
  }
});
