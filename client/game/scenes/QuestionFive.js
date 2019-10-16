import Phaser from 'phaser';
// import Avatar from '../sprites/Avatar';
import store from '../../store';

const avatarStr = 'avatar';
const fontStyleQuestion = {
  font: '4em Yeon Sung',
  fill: '#ff2525',
  align: 'center'
};
const fontStyleAnswer = {
  font: '3em Lakki Reddy',
  fill: '#005bd3'
};
const fontStyleCountdown = {
  font: '3em Yeon Sung',
  fill: '#32a852',
  align: 'center'
};

export default class QuestionFive extends Phaser.Scene {
  constructor() {
    super({ key: 'QuestionFive' });
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
    this.load.image(avatarStr, avatar);
    this.load.image('troll', '/troll128.png');
    this.load.image('mistylake', '/MistyLake.png');
  }

  create() {
    this.bg = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'mistylake'
    );

    this.bg.displayWidth = this.game.config.width;
    this.bg.displayHeight = this.game.config.height;

    this.add.text(
      3.1 * this.bg.displayWidth / 4,
      this.bg.displayHeight / 23,
      'You have: ',
      fontStyleCountdown
    );

    this.add.text(
      2.9 * this.bg.displayWidth / 4,
      this.bg.displayHeight / 8,
      'seconds\nto answer this question!',
      fontStyleCountdown
    );

    this.initialTime = 30;

    this.countDownText = this.add.text(
      3.15 * this.bg.displayWidth / 4,
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
      delay: 30000,
      callback: () => {
        this.scene.start('TrollHole');
      },
      callbackScope: this
    });

    this.add.text(
      0.1 * this.bg.displayWidth / 4,
      1.5 * this.bg.displayHeight / 4,
      `You've run so far, that you've reached the water. \nSomething about this lake seems strange. You:`,
      fontStyleQuestion
    );
    this.answerA = this.add.text(
      2.5 * this.bg.displayWidth / 4,
      2.6 * this.bg.displayHeight / 4,
      'Get in the boat and drift away',
      fontStyleAnswer
    );
    this.answerB = this.add.text(
      1.65 * this.bg.displayWidth / 4,
      2.1 * this.bg.displayHeight / 4,
      'Go skinny dipping',
      fontStyleAnswer
    );

    this.physicsObjectA = this.physics.add.existing(this.answerA, 'static');
    this.physicsObjectB = this.physics.add.existing(this.answerB, 'static');

    this.avatar = this.physics.add.sprite(
      1.25 * this.bg.displayWidth / 4,
      2.6 * this.bg.displayHeight / 4,
      avatarStr
    );
    this.avatar.body.setAllowGravity(false);
    this.avatar.setCollideWorldBounds(true);

    this.physics.add.collider(
      this.avatar,
      this.physicsObjectA,
      () => {
        this.scene.start('QuestionTen');
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
