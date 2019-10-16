const router = require('express').Router();
const User = require('../db/models/user');
const { Room, UserRoom } = require('../db/models');
const Question = require('../db/models/question');
const Answer = require('../db/models/answer');

module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({
      where: { email: email },
      include: [
        {
          model: Room,
          include: [{ model: Question, include: [{ model: Answer }] }]
        }
      ],
      order: [[Room, UserRoom, 'createdAt', 'ASC']]
    });
    if (!user) {
      console.log('No such user found:', email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(password)) {
      console.log('Incorrect password for user:', email);
      res.status(401).send('Wrong username and/or password');
    } else {
      console.log('USER IN API ROUTE', user);
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const {
      email,
      password,
      firstName,
      age,
      height,
      orientation,
      gender,
      photo,
      avatar
    } = req.body;
    const user = await User.create({
      email: email,
      password: password,
      firstName: firstName,
      age: age,
      height: height,
      orientation: orientation,
      gender: gender,
      photo: photo,
      avatar: avatar
    });
    const room = await user.addRoom(1);
    const userToSend = await User.findOne({
      where: { email: email },
      include: [
        {
          model: Room,
          include: [{ model: Question, include: [{ model: Answer }] }]
        }
      ],
      order: [[Room, UserRoom, 'createdAt', 'ASC']]
    });

    req.login(userToSend, err => (err ? next(err) : res.json(userToSend)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    include: [
      {
        model: Room,
        include: [{ model: Question, include: [{ model: Answer }] }]
      }
    ],
    order: [[Room, UserRoom, 'createdAt', 'ASC']]
  });
  res.json(user);
});

router.use('/google', require('./google'));
