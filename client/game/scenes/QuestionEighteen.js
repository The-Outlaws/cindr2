import Phaser from 'phaser';
// import Avatar from '../sprites/Avatar';
import store from '../../store';
// import { getActiveUsers } from '../../store/reducers/room';

const avatarStr = 'avatar';
const fontStyleQuestion = {
  font: '6em Yeon Sung',
  fill: 'white',
  align: 'center'
};
const fontStyleAnswer = {
  font: '4.5em Lakki Reddy',
  fill: 'white',
  align: 'center'
};
const fontStyleCountdown = {
  font: '4.5em Yeon Sung',
  fill: 'white',
  align: 'center'
};

export default class QuestionEighteen extends Phaser.Scene {
  constructor() {
    super({ key: 'QuestionEighteen' });
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
    this.load.image('garden', '/garden.jpg');
  }

  create() {
    this.bg = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'garden'
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
      3 * this.bg.displayWidth / 4,
      this.bg.displayHeight / 8,
      'seconds\nto answer this question!',
      fontStyleCountdown
    );

    this.initialTime = 30;

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

    // this.time.addEvent({
    //   delay: 30000,
    //   callback: () => {
    //     this.scene.start('TrollHole');
    //   },
    //   callbackScope: this
    // });

    this.add.text(
      0.5 * this.bg.displayWidth / 4,
      0.08 * this.bg.displayHeight / 4,
      `You spy some friendly looking gnomes. You:`,
      fontStyleQuestion
    );
    this.answerA = this.add.text(
      1.35 * this.bg.displayWidth / 4,
      3 * this.bg.displayHeight / 4,
      'Approach \nand \nschmooze',
      fontStyleAnswer
    );
    this.answerB = this.add.text(
      0.05 * this.bg.displayWidth / 4,
      3 * this.bg.displayHeight / 4,
      'Acknowledge \nthem \nwith a nod',
      fontStyleAnswer
    );

    this.physicsObjectA = this.physics.add.existing(this.answerA, 'static');
    this.physicsObjectB = this.physics.add.existing(this.answerB, 'static');

    this.avatar = this.physics.add.sprite(
      0.15 * this.bg.displayWidth / 4,
      2 * this.bg.displayHeight / 4,
      avatarStr
    );
    this.avatar.body.setAllowGravity(false);
    this.avatar.setCollideWorldBounds(true);

    this.physics.add.collider(
      this.avatar,
      this.physicsObjectA,
      () => {
        this.scene.start('DestinationRoom');
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
