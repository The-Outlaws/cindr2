import Phaser, { GameObjects } from 'phaser';
// import Avatar from '../sprites/Avatar';
import store from '../../store';

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
    this.load.image('crystalBackground', '/CrystalScene.png');
    this.load.image(avatarStr, avatar);
  }

  create() {
    // Background image
    this.bg = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'crystalBackground'
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
      3.39 * this.bg.displayWidth / 4,
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
      'Who strikes\nyour fancy?',
      fontStyleQuestion
    );

    // Game Objects Leading to Different Rooms
    this.answerA = this.add.text(
      0.7 * this.bg.displayWidth / 4,
      1.6 * this.bg.displayHeight / 3,
      'Friend',
      fontStyleAnswer
    );

    // Makes your life choices fall away !! aka adds answerA to physics
    this.physicsObjectA = this.physics.add.existing(this.answerA, 'static');
    // this.physicsObjectA.onCollide = true;

    this.answerB = this.add.text(
      2.1 * this.bg.displayWidth / 3,
      this.bg.displayHeight / 2.2,
      'Date',
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

    //creates a collision between sprite and answer, triggers room change
    this.physics.add.collider(
      this.avatar,
      this.physicsObjectA,
      () => {
        // console.log('hello');
        this.scene.start('DestinationRoom2');
      },
      null,
      this
    );

    this.physics.add.collider(
      this.avatar,
      this.physicsObjectB,
      () => {
        this.scene.start('DestinationRoom');
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
    this.input.on('pointerdown', () => this.scene.start('DestinationRoom'));
  }
}
