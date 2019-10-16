import Phaser, { GameObjects } from 'phaser';
// import Avatar from '../sprites/Avatar';
import store from '../../store';
import { updateUserRooms } from '../../store';

const avatarStr = 'avatar';

const fontStyleQuestion = {
  font: '6em Indie Flower',
  fill: '#bdd8fa',
  align: 'center'
};

const fontStyleAnswer = {
  font: '6em Indie Flower',
  fill: '#b5f7bf'
};

const fontStyleCountdown = {
  font: '4em Indie Flower',
  fill: '#9bc2f1',
  align: 'center'
};

export default class QuestionRoom extends Phaser.Scene {
  constructor() {
    super({ key: 'QuestionRoom' });
  }

  //decrements seconds every one second and displays countdown
  onEvent() {
    this.initialTime -= 1;
    this.countDownText.setText(`${this.initialTime}`);
  }

  init() {
    this.playerSpeed = 10;
  }

  preload() {
    const { user: { avatar } } = store.getState();
    this.load.image('/MushroomScene.png', '/MushroomScene.png');
    this.load.image('/CastleScene.png', '/CastleScene.png');
    this.load.image('/OfficeTrollHole.png', '/OfficeTrollHole.png');
    this.load.image('/CrystalScene.png', '/CrystalScene.png');
    this.load.image('/hauntedlair.jpg', '/hauntedlair.jpg');
    this.load.image('/cottage.jpg', '/cottage.jpg');
    this.load.image('/catgarden.jpg', '/catgarden.jpg');
    this.load.image('/cloud.jpg', '/cloud.jpg');
    this.load.image('/bananacat.jpg', '/bananacat.jpg');
    this.load.image('/smores.jpg', '/smores.jpg');
    this.load.image('/garden.jpg', '/garden.jpg');
    this.load.image('/treehouse.jpg', '/treehouse.jpg');
    this.load.image('/wisetree.jpg', '/wisetree.jpg');
    this.load.image('/spookyforest.jpg', '/spookyforest.jpg');
    this.load.image(avatarStr, avatar);
  }

  create() {
    // Background image
    const userData = store.getState();
    const room = userData.user.rooms[userData.user.rooms.length - 1];
    const roomImg = room.image;
    const roomQuestion = room.question ? room.question : { content: ' ' };
    const answerA = room.question
      ? room.question.answers[0]
        ? room.question.answers[0]
        : { content: ' ', roomRouteId: 16 }
      : { content: ' ', roomRouteId: 16 };
    const answerB = room.question
      ? room.question.answers[1]
        ? room.question.answers[1]
        : { content: ' ', roomRouteId: 16 }
      : { content: ' ', roomRouteId: 16 };

    this.bg = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      roomImg
    );
    this.bg.displayWidth = this.game.config.width;
    this.bg.displayHeight = this.game.config.height;

    this.add.text(
      3.3 * this.bg.displayWidth / 4,
      this.bg.displayHeight / 23,
      'You have: ',
      fontStyleCountdown
    );

    this.add.text(
      3.1 * this.bg.displayWidth / 4,
      this.bg.displayHeight / 8,
      'seconds\nto answer this question!',
      fontStyleCountdown
    );

    this.initialTime = 15;

    this.countDownText = this.add.text(
      3.38 * this.bg.displayWidth / 4,
      this.bg.displayHeight / 13,
      `${this.initialTime}`,
      fontStyleQuestion
    );

    this.time.addEvent({
      delay: 1000,
      callback: this.onEvent,
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: 15000,
      callback: () => {
        this.scene.start('TrollHole');
      },
      callbackScope: this
    });

    this.add.text(
      this.bg.displayWidth / 2,
      this.bg.displayHeight / 4,
      roomQuestion.content,
      fontStyleQuestion
    );

    // Game Objects Leading to Different Rooms
    this.answerA = this.add.text(
      0.7 * this.bg.displayWidth / 4,
      1.6 * this.bg.displayHeight / 3,
      answerA.content,
      fontStyleAnswer
    );

    // Makes your life choices fall away !! aka adds answerA to physics
    this.physicsObjectA = this.physics.add.existing(this.answerA, 'static');
    // this.physicsObjectA.onCollide = true;

    this.answerB = this.add.text(
      2.1 * this.bg.displayWidth / 3,
      this.bg.displayHeight / 2.2,
      answerB.content,
      fontStyleAnswer
    );
    this.physicsObjectB = this.physics.add.existing(this.answerB, 'static');
    // Avatar
    // this.avatar = new Avatar({
    //   scene: this.physics,
    //   x: 100,
    //   y: 700,
    //   asset: 'troll'
    // });

    //adds sprite to physics object, disables gravity so it doesn't fall
    this.avatar = this.physics.add.sprite(
      this.bg.displayWidth / 2,
      4 * this.bg.displayHeight / 5,
      avatarStr
    );
    this.avatar.body.setAllowGravity(false);
    this.avatar.setCollideWorldBounds(true);

    //creates a collision between sprite and answer, triggers room change
    this.physics.add.collider(
      this.avatar,
      this.physicsObjectA,
      async () => {
        await store.dispatch(
          updateUserRooms(userData.user.id, answerA.roomRouteId)
        );
        this.scene.start('QuestionRoom');
      },
      null,
      this
    );

    this.physics.add.collider(
      this.avatar,
      this.physicsObjectB,
      async () => {
        await store.dispatch(
          updateUserRooms(userData.user.id, answerB.roomRouteId)
        );
        this.scene.start('QuestionRoom');
      },
      null,
      this
    );
    // Variable containing up/down/right/left keys
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      if (this.cursors.up.isDown) this.avatar.y -= this.playerSpeed;
      else if (this.cursors.down.isDown) this.avatar.y += this.playerSpeed;

      this.avatar.x -= this.playerSpeed;
    }
    if (this.cursors.right.isDown) {
      if (this.cursors.up.isDown) this.avatar.y -= this.playerSpeed;
      else if (this.cursors.down.isDown) this.avatar.y += this.playerSpeed;

      this.avatar.x += this.playerSpeed;
    }
    if (this.cursors.up.isDown) {
      if (this.cursors.left.isDown) this.avatar.x -= this.playerSpeed;
      else if (this.cursors.right.isDown) this.avatar.x += this.playerSpeed;

      this.avatar.y -= this.playerSpeed;
    }
    if (this.cursors.down.isDown) {
      if (this.cursors.left.isDown) this.avatar.x -= this.playerSpeed;
      else if (this.cursors.right.isDown) this.avatar.x += this.playerSpeed;

      this.avatar.y += this.playerSpeed;
    }
  }
}
