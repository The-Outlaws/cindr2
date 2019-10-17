const router = require('express').Router();
const { Room, User } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const allRooms = await Room.findAll({
      include: [User]
    });

    res.json(allRooms);
  } catch (error) {
    next(error);
  }
});
// Get all users in current room to load into destination room
router.get('/:roomId', async (req, res, next) => {
  try {
    const allRooms = await Room.findAll({
      include: [User]
    });
    const currentRoom = allRooms.filter(room => room.id == req.params.roomId);
    //get only active users, not including the user herself
    // const activeUsers = currentRoom.users.filter(user => user !== req.user.id)
    // res.json(activeUsers)
    res.json(currentRoom);
  } catch (error) {
    next(error);
  }
});
