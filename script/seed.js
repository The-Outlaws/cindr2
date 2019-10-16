'use strict';

const db = require('../server/db');
const {
  User,
  Room,
  Question,
  Answer,
  Message,
  UserRoom,
  Conversation
} = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      firstName: 'Petra',
      height: "5'4",
      email: 'petra@email.com',
      gender: 'Female',
      password: '123password',
      age: 29,
      avatar: '/hydra.png',
      orientation: 'likes men',
      isAdmin: true
    }),
    User.create({
      firstName: 'Guenna',
      height: "5'4",
      email: 'gcaizley0@mail.ru',
      gender: 'Female',
      password: '3ZvOycTCrZ',
      age: 21,
      orientation: '6th generation'
    }),
    User.create({
      firstName: 'Nicki',
      height: "5'4",
      email: 'nwanka1@ftc.gov',
      gender: 'Female',
      password: '8ytHCL6LXWvf',
      age: 30,
      orientation: 'projection'
    }),
    User.create({
      firstName: 'Lissa',
      height: "5'4",
      email: 'lfitzsimons2@barnesandnoble.com',
      gender: 'Female',
      password: '7sAuUY2',
      age: 91,
      orientation: 'leverage'
    }),
    User.create({
      firstName: 'Piper',
      height: "5'4",
      email: 'plakenton3@goo.gl',
      gender: 'Female',
      password: 'Hh4A5o3n70',
      age: 59,
      orientation: 'Visionary'
    }),
    User.create({
      firstName: 'Lyndell',
      height: "5'4",
      email: 'lcasassa4@guardian.co.uk',
      gender: 'Female',
      password: 'TUe0UJ',
      age: 38,
      orientation: 'Innovative'
    }),
    User.create({
      firstName: 'Abram',
      height: "5'4",
      email: 'abernholt5@va.gov',
      gender: 'Male',
      password: 'zdw2LXASO',
      age: 47,
      orientation: 'contingency'
    }),
    User.create({
      firstName: 'Jarvis',
      height: "5'4",
      email: 'jjolliss6@google.fr',
      gender: 'Male',
      password: '5j41tXPkY',
      age: 21,
      orientation: 'Expanded'
    }),
    User.create({
      firstName: 'Riordan',
      height: "5'4",
      email: 'rmcbeith7@t-online.de',
      gender: 'Male',
      password: 'hvRZsu',
      age: 19,
      orientation: 'Versatile'
    }),
    User.create({
      firstName: 'Nye',
      height: "5'4",
      email: 'npoolman8@icio.us',
      gender: 'Male',
      password: 'Bi8zu89al',
      age: 82,
      orientation: 'hub'
    }),
    User.create({
      firstName: 'Erasmus',
      height: "5'4",
      email: 'elinge9@pbs.org',
      gender: 'Male',
      password: 'Ajpa7ibfBv',
      age: 18,
      orientation: 'motivating'
    }),
    User.create({
      firstName: 'Anita',
      height: "5'4",
      email: 'aginnalya@buzzfeed.com',
      gender: 'Female',
      password: 'z0Qv8UA',
      age: 95,
      orientation: 'Graphical User Interface'
    }),
    User.create({
      firstName: 'Margarita',
      height: "5'4",
      email: 'mdalyellb@stanford.edu',
      gender: 'Female',
      password: 'VvtF3vXV9F2r',
      age: 82,
      orientation: 'even-keeled'
    }),
    User.create({
      firstName: 'Burch',
      height: "5'4",
      email: 'bstollsteimerc@amazon.de',
      gender: 'Male',
      password: 'fdHDykioED6B',
      age: 99,
      orientation: 'disintermediate'
    }),
    User.create({
      firstName: 'Weider',
      height: "5'4",
      email: 'wshovelind@earthlink.net',
      gender: 'Male',
      password: 'Zp3XcgIUWVp',
      age: 46,
      orientation: 'Decentralized'
    }),
    User.create({
      firstName: 'Aaron',
      height: "5'4",
      email: 'adefreitase@msu.edu',
      gender: 'Male',
      password: 'OUANudXXHVgm',
      age: 18,
      orientation: 'hub'
    })
  ]);
  const rooms = await Promise.all([
    Room.create({
      id: 33,
      name: 'Troll Hole',
      trollRoom: true,
      image: '/OfficeTrollHole.png'
    }),
    Room.create({
      id: 1,
      name: 'Quaint Cottage',
      trollRoom: false,
      image: '/cottage.jpg'
    }),
    Room.create({
      id: 2,
      name: 'Evil Castle',
      trollRoom: false,
      image: '/CastleScene.png'
    }),
    Room.create({
      id: 3,
      name: 'Haunted Lair',
      trollRoom: false,
      image: '/hauntedlair.jpg'
    }),
    Room.create({
      id: 4,
      name: 'Whimsical Meadow',
      trollRoom: false,
      image: '/MushroomScene.png'
    }),
    Room.create({
      id: 5,
      name: 'Happy Kitchen',
      trollRoom: false,
      image: '/ColorfulBoringKitchen.png'
    }),
    Room.create({
      id: 6,
      name: 'Cat Garden',
      trollRoom: false,
      image: '/catgarden.jpg'
    }),
    Room.create({
      id: 12,
      name: 'Cavernous Cave',
      trollRoom: false,
      image: '/CrystalScene.png'
    }),
    Room.create({
      id: 11,
      name: 'Spooky Forest',
      trollRoom: false,
      image: '/spookyforest.jpg'
    }),
    Room.create({
      id: 13,
      name: 'Frozen the Musical',
      trollRoom: false,
      image: '/SpaceScene.png'
    }),
    Room.create({
      id: 14,
      name: 'Bananacat',
      trollRoom: false,
      image: '/bananacat.jpg'
    }),
    Room.create({
      id: 10,
      name: 'Garden',
      trollRoom: false,
      image: '/SpiderScene.png'
    }),
    Room.create({
      id: 15,
      name: `S'mores`,
      trollRoom: false,
      image: '/smores.jpg'
    }),
    Room.create({
      id: 16,
      name: 'Misty Lake',
      trollRoom: false,
      image: '/MistyLake.png'
    }),
    Room.create({
      id: 9,
      name: 'Wise Tree',
      trollRoom: false,
      image: '/wisetree.jpg'
    }),
    Room.create({
      id: 8,
      name: 'Garden',
      trollRoom: false,
      image: '/garden.jpg'
    }),
    Room.create({
      id: 7,
      name: 'Awkward Tree House',
      trollRoom: false,
      image: '/treehouse.jpg'
    }),
    Room.create({
      id: 17,
      name: 'Fluffy Cloud',
      trollRoom: false,
      image: '/cloud.jpg'
    })
  ]);

  const userRooms = await Promise.all([
    UserRoom.create({ userId: 1, roomId: 1, isActive: true })
  ]);

  // const userRooms = await Promise.all([s
  //   UserRooms.create({ isActive: true, userId: 2, roomId: 1 }),
  //   UserRooms.create({ isActive: false, userId: 4, roomId: 2 })
  // ]);
  const questions = await Promise.all([
    Question.create({ id: 1, content: 'Who strikes your fancy?', roomId: 1 }),
    Question.create({
      id: 2,
      content: 'This castle is filled with ghosts. What to do?',
      roomId: 2
    }),
    Question.create({
      id: 3,
      content:
        'The friendly ghosts can’t imbibe, but as gracious hosts, they invite you to - you choose:',
      roomId: 3
    }),
    Question.create({
      id: 4,
      content:
        'The ghosts would love for you to stay, but they have some haunting to do. Busy busy, they can’t wait for retirement. They lead you toward two paths, you choose:',
      roomId: 4
    }),
    Question.create({
      id: 5,
      content:
        'The ghosts kick you out - they were hoping for something a little more exciting. You:',
      roomId: 5
    }),
    Question.create({
      id: 6,
      content:
        'There’s a tabby cat blocking your path - when you approach, she gives you a set of instructions for a task she needs help with. You:',
      roomId: 6
    }),
    Question.create({
      id: 7,
      content: 'The cat’s kitten has climbed a tree and can’t get down! You:',
      roomId: 7
    }),
    Question.create({
      id: 8,
      content: 'You encounter a table, set with an immaculate feast. You: ',
      roomId: 11
    }),
    Question.create({
      id: 9,
      content: `Somehow, you've stumbled into a cavernous cave. What next?`,
      roomId: 12
    }),
    Question.create({
      id: 10,
      content: 'ROOM 9 QUESTION, TROLL HOLE????',
      roomId: 13
    }),
    Question.create({
      id: 11,
      content: 'ROOM 10 QUESTION',
      roomId: 14
    })
  ]);

  const answers = await Promise.all([
    Answer.create({ content: 'Friend', roomRouteId: 2, questionId: 1 }),
    Answer.create({ content: 'Date', roomRouteId: 14, questionId: 1 }),
    Answer.create({
      content: 'Meet some friendly ghosts',
      roomRouteId: 3,
      questionId: 2
    }),
    Answer.create({
      content: 'Run the f*** away',
      roomRouteId: 6,
      questionId: 2
    }),
    Answer.create({
      content: 'Beer, duh',
      roomRouteId: 4,
      questionId: 3
    }),
    Answer.create({
      content: 'Tea, please',
      roomRouteId: 5,
      questionId: 3
    }),
    Answer.create({
      content: 'The garden path, filled with roses',
      roomRouteId: 8,
      questionId: 4
    }),
    Answer.create({
      content: 'The spooky forest. Go gently unto that good night',
      roomRouteId: 9,
      questionId: 4
    }),
    Answer.create({
      content: 'Take the garden path, you want to smell the roses',
      roomRouteId: 10,
      questionId: 5
    }),
    Answer.create({
      content: 'Try your luck on the spooky forest path',
      roomRouteId: 11,
      questionId: 5
    }),
    Answer.create({
      content: 'Do everything the cat tells you to do!',
      questionId: 6,
      roomRouteId: 7
    }),
    Answer.create({
      content: 'Think Huh, a talking cat, and continue along your way',
      questionId: 6,
      roomRouteId: 12
    }),
    Answer.create({
      content: 'Climb the tree and help him down, braving a few scratches',
      questionId: 7,
      roomRouteId: 13
    }),
    Answer.create({
      content: 'Get someone else to do it - you’re terrified of heights',
      questionId: 7,
      roomRouteId: 14
    }),
    // Answer.create({
    //   content:
    //     'Start with a slice of pizza, then move on to the mac and cheese',
    //   questionId: 8,
    //   roomRouteId: 15
    // }),
    // Answer.create({
    //   content:
    //     'This is obviously a trap set with poison - besides, you had a sensible breakfast, and aren’t really all that hungry. Move along.',
    //   questionId: 8,
    //   roomRouteId: 16
    // }),
    Answer.create({
      content: 'Make some mores!',
      questionId: 9,
      roomRouteId: 15
    }),
    Answer.create({
      content: 'Go deeper',
      questionId: 9,
      roomRouteId: 16
    })
    // Answer.create({
    //   content: 'ANSWER 1 ROOM 10 TO ROOM 7',
    //   questionId: 10,
    //   roomRouteId: 7
    // }),
    // Answer.create({
    //   content: 'ANSWER 2 ROOM 9 TO ROOM 8',
    //   questionId: 10,
    //   roomRouteId: 8
    // })
  ]);

  const conversations = await Promise.all([
    Conversation.create({
      id: 1,
      userId: 1,
      matchId: 2,
      isAccepted: true,
      isRejected: false
    }),
    Conversation.create({
      id: 2,
      userId: 2,
      matchId: 3,
      isAccepted: true,
      isRejected: false
    }),
    Conversation.create({
      id: 3,
      userId: 1,
      matchId: 3,
      isAccepted: false,
      isRejected: false
    }),
    Conversation.create({
      id: 4,
      userId: 1,
      matchId: 4,
      isAccepted: true,
      isRejected: false
    }),
    Conversation.create({
      id: 5,
      userId: 5,
      matchId: 1,
      isAccepted: false,
      isRejected: false
    })
  ]);
  // const userMatches = await Promise.all([
  //   UserMatches.create({userId: 1, matchId: 2, isAccepted: true, isRejected: false})
  // ])
  const messages = await Promise.all([
    Message.create({
      content: 'Hey, you!',
      userId: 1,
      conversationId: 1
    }),
    Message.create({
      content: 'Hey, back!',
      userId: 2,
      conversationId: 1
    }),
    Message.create({
      content: 'So, you like friendly ghosts?!',
      userId: 1,
      conversationId: 1
    }),
    Message.create({
      content: 'Yeah! Caspar <3',
      userId: 2,
      conversationId: 1
    }),

    Message.create({
      content: 'Hi, my name is Guenna!',
      userId: 2,
      conversationId: 2
    }),
    Message.create({
      content: 'Hey, Guenna!',
      userId: 3,
      conversationId: 2
    }),
    Message.create({
      content: 'Hi, boo!',
      userId: 1,
      conversationId: 4
    }),
    Message.create({
      content: 'errr',
      userId: 4,
      conversationId: 4
    })
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
