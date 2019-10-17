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
  fill: '#1b7c55',
  align: 'center'
};
const fontStyleCountdown = {
  font: '3em Yeon Sung',
  fill: '#1b7c55',
  align: 'center'
};

export default class QuestionEight extends Phaser.Scene {
  constructor() {
    super({ key: 'QuestionEight' });
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
    this.load.image('kitchen', '/ColorfulBoringKitchen.png');
  }

  create() {
    this.bg = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'kitchen'
    );

    this.bg.displayWidth = this.game.config.width;
    this.bg.displayHeight = this.game.config.height;

    this.add.text(
      3.45 * this.bg.displayWidth / 4,
      this.bg.displayHeight / 4,
      'You have: ',
      fontStyleCountdown
    );

    this.add.text(
      3.25 * this.bg.displayWidth / 4,
      1.4 * this.bg.displayHeight / 4,
      'seconds\nto answer this question!',
      fontStyleCountdown
    );

    this.initialTime = 30;

    this.countDownText = this.add.text(
      3.5 * this.bg.displayWidth / 4,
      1.2 * this.bg.displayHeight / 4,
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
      0.9 * this.bg.displayWidth / 4,
      0.05 * this.bg.displayHeight / 4,
      `The ghosts kick you out, they were hoping for something a little more exciting`,
      fontStyleQuestion
    );
    this.answerA = this.add.text(
      0.9 * this.bg.displayWidth / 4,
      3 * this.bg.displayHeight / 4,
      'You take the \ngarden path,\nyou want to \nsmell the roses',
      fontStyleAnswer
    );
    this.answerB = this.add.text(
      2.2 * this.bg.displayWidth / 4,
      3.2 * this.bg.displayHeight / 4,
      'You try your luck \non the spooky forest path',
      fontStyleAnswer
    );

    this.physicsObjectA = this.physics.add.existing(this.answerA, 'static');
    this.physicsObjectB = this.physics.add.existing(this.answerB, 'static');

    this.avatar = this.physics.add.sprite(
      0.15 * this.bg.displayWidth / 4,
      1.5 * this.bg.displayHeight / 4,
      avatarStr
    );
    this.avatar.body.setAllowGravity(false);
    this.avatar.setCollideWorldBounds(true);

    this.physics.add.collider(
      this.avatar,
      this.physicsObjectA,
      () => {
        this.scene.start('QuestionSixteen');
      },
      null,
      this
    );

    this.physics.add.collider(
      this.avatar,
      this.physicsObjectB,
      () => {
        this.scene.start('QuestionSeventeen');
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