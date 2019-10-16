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

    res.json(currentRoom);
  } catch (error) {
    next(error);
  }
});

// Get rooms with associated users
// router.get('/', async (req, res, next) => {
//   try {
//     const rooms = await Room.findAll(
//       {include: [User]}
//     );
//     res.json(rooms);
//   } catch (err) {
//     next(err);
//   }
// });

// router.get('/:userId', async (req, res, next) => {
//   try {
//     const activeUserRm = await UserRoom.findOrCreate({
//       where: {
//         userId: req.params.userId,
//         isActive: true
//       }
//     });

//     const activeRmId = await Room.findOrCreate({
//       where: {
//        roomId: activeUserRm.roomId
//       }
//     });

//     res.json(activeRmId);
//   } catch (err) {
//     next(err);
//   }
// });

// router.post('/:userId', async (req, res, next) => {
//   try {
//     const newRoom = await UserRoom.create({
//       userId: req.params.userId,
//       roomId: req.body.roomId,
//       active: true
//     })
//     const roomDetails = await Room.findById(newRoom.roomId)

//     res.json(roomDetails)
//   } catch (err) {
//     next (err)
//   }
// })

// router.get('/active/:userId', async (req, res, next) => {
//   try {
//     const activeRoom = await UserRoom.findOrCreate({
//       where: {
//         userId: req.params.userId,
//         isActive: true
//       }
//     });
//     const roomData = await Room.findById(activeRoom.roomId);

//     res.json(roomData);
//   } catch (error) {
//     next(err);
//   }
// });
