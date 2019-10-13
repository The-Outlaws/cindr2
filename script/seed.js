'use strict';

const db = require('../server/db');
const {
  User,
  Room,
  Question,
  Answer,
  Message,
  Conversation,
  UserMatches
} = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      firstName: 'Petra',
      height: 65,
      email: 'petra@email.com',
      gender: 'Female',
      password: '123password',
      age: 29,
      orientation: 'likes men',
      isAdmin: true
    }),
    User.create({
      firstName: 'Guenna',
      height: 45,
      email: 'gcaizley0@mail.ru',
      gender: 'Female',
      password: '3ZvOycTCrZ',
      age: 21,
      orientation: '6th generation'
    }),
    User.create({
      firstName: 'Nicki',
      height: 91,
      email: 'nwanka1@ftc.gov',
      gender: 'Female',
      password: '8ytHCL6LXWvf',
      age: 30,
      orientation: 'projection'
    }),
    User.create({
      firstName: 'Lissa',
      height: 108,
      email: 'lfitzsimons2@barnesandnoble.com',
      gender: 'Female',
      password: '7sAuUY2',
      age: 91,
      orientation: 'leverage'
    }),
    User.create({
      firstName: 'Piper',
      height: 100,
      email: 'plakenton3@goo.gl',
      gender: 'Female',
      password: 'Hh4A5o3n70',
      age: 59,
      orientation: 'Visionary'
    }),
    User.create({
      firstName: 'Lyndell',
      height: 98,
      email: 'lcasassa4@guardian.co.uk',
      gender: 'Female',
      password: 'TUe0UJ',
      age: 38,
      orientation: 'Innovative'
    }),
    User.create({
      firstName: 'Abram',
      height: 83,
      email: 'abernholt5@va.gov',
      gender: 'Male',
      password: 'zdw2LXASO',
      age: 47,
      orientation: 'contingency'
    }),
    User.create({
      firstName: 'Jarvis',
      height: 110,
      email: 'jjolliss6@google.fr',
      gender: 'Male',
      password: '5j41tXPkY',
      age: 21,
      orientation: 'Expanded'
    }),
    User.create({
      firstName: 'Riordan',
      height: 50,
      email: 'rmcbeith7@t-online.de',
      gender: 'Male',
      password: 'hvRZsu',
      age: 19,
      orientation: 'Versatile'
    }),
    User.create({
      firstName: 'Nye',
      height: 94,
      email: 'npoolman8@icio.us',
      gender: 'Male',
      password: 'Bi8zu89al',
      age: 82,
      orientation: 'hub'
    }),
    User.create({
      firstName: 'Erasmus',
      height: 69,
      email: 'elinge9@pbs.org',
      gender: 'Male',
      password: 'Ajpa7ibfBv',
      age: 18,
      orientation: 'motivating'
    }),
    User.create({
      firstName: 'Anita',
      height: 91,
      email: 'aginnalya@buzzfeed.com',
      gender: 'Female',
      password: 'z0Qv8UA',
      age: 95,
      orientation: 'Graphical User Interface'
    }),
    User.create({
      firstName: 'Margarita',
      height: 97,
      email: 'mdalyellb@stanford.edu',
      gender: 'Female',
      password: 'VvtF3vXV9F2r',
      age: 82,
      orientation: 'even-keeled'
    }),
    User.create({
      firstName: 'Burch',
      height: 69,
      email: 'bstollsteimerc@amazon.de',
      gender: 'Male',
      password: 'fdHDykioED6B',
      age: 99,
      orientation: 'disintermediate'
    }),
    User.create({
      firstName: 'Weider',
      height: 110,
      email: 'wshovelind@earthlink.net',
      gender: 'Male',
      password: 'Zp3XcgIUWVp',
      age: 46,
      orientation: 'Decentralized'
    }),
    User.create({
      firstName: 'Aaron',
      height: 82,
      email: 'adefreitase@msu.edu',
      gender: 'Male',
      password: 'OUANudXXHVgm',
      age: 18,
      orientation: 'hub'
    })
  ]);
  const rooms = await Promise.all([
    Room.create({ name: 'Quaint Cottage', trollRoom: false }),
    Room.create({ name: 'Evil Castle', trollRoom: false }),
    Room.create({ name: 'Haunted Lair', trollRoom: false }),
    Room.create({ name: 'Whimsical Meadow', trollRoom: false }),
    Room.create({ name: 'Happy Kitchen', trollRoom: false }),
    Room.create({ name: 'Cozy Hut', trollRoom: false }),
    Room.create({ name: 'Cavernous Cave', trollRoom: false }),
    Room.create({ name: 'Limey Cave', trollRoom: false }),
    Room.create({ name: 'Frozen the Musical', trollRoom: true }),
    Room.create({ name: 'The Dungeon', trollRoom: false }),
    Room.create({ name: 'The Office', trollRoom: true }),
    Room.create({ name: 'Fluffy Cloud', trollRoom: false }),
    Room.create({ name: 'Green Grove', trollRoom: false }),
    Room.create({ name: 'Wise Tree', trollRoom: false }),
    Room.create({ name: 'Awkward Tree House', trollRoom: true })
  ]);

  const questions = await Promise.all([
    Question.create({ content: 'Who strikes your fancy?', roomId: 1 }),
    Question.create({
      content: 'This castle is filled with ghosts. What to do?',
      roomId: 2
    })
  ]);

  const answers = await Promise.all([
    Answer.create({ content: 'Friend', roomRouteId: 2, questionId: 1 }),
    Answer.create({ content: 'Date', roomRouteId: 3, questionId: 1 }),
    Answer.create({
      content: 'Meet some friendly ghosts',
      roomRouteId: 3,
      questionId: 2
    }),
    Answer.create({
      content: 'Run the f*** away',
      roomRouteId: 4,
      questionId: 2
    })
  ]);

  const conversations = await Promise.all([
    Conversation.create({
      userId: 1,
      matchId: 2,
      isAccepted: true,
      isRejected: false
    })
  ]);
  // const userMatches = await Promise.all([
  //   UserMatches.create({userId: 1, matchId: 2, isAccepted: true, isRejected: false})
  // ])
  const messages = await Promise.all([
    Message.create({ content: 'Hey, you!', userId: 1, conversationId: 1 }),
    Message.create({ content: 'Hey, back!', userId: 2, conversationId: 1 }),
    Message.create({
      content: 'So, you like friendly ghosts?!',
      userId: 1,
      conversationId: 1
    }),
    Message.create({ content: 'Yeah! Caspar <3', userId: 2, conversationId: 1 })
  ]);
  console.log(
    `seeded ${users.length} users, ${rooms.length} rooms, ${
      questions.length
    } questions, ${answers.length} answers, ${messages.length} messages, ${
      conversations.length
    } conversations`
  );
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
