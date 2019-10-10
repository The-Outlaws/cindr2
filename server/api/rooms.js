const router = require('express').Router();
const { Room, UserRoom } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const activeUserRm = await UserRoom.findOne({
      where: {
        userId: req.params.userId,
        isActive: true
      }
    });
    const activeRmId = await Room.findById(activeUserRm.roomId);
    res.json(activeRmId);
  } catch (err) {
    next(err);
  }
});
