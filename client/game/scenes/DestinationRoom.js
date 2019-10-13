import Phaser from 'phaser';
import Avatar from '../sprites/Avatar';
import store from '../../store';

const avatarStr = 'avatar';
const fontStyleQuestion = {
  font: '6em Yeon Sung',
  fill: '#ff2525',
  align: 'center'
};
const fontStyleAnswer = {
  font: '4.5em Lakki Reddy',
  fill: '#005bd3'
};
const fontStyleCountdown = {
  font: '4.5em Yeon Sung',
  fill: '#32a852',
  align: 'center'
};

export default class DestinationRoom extends Phaser.Scene {
  constructor() {
    super({ key: 'DestinationRoom' });
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
    this.load.image('mushroom', '/MushroomScene.png');
  }

  create() {
    this.bg = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'mushroom'
    );
    this.bg.displayWidth = this.game.config.width;
    this.bg.displayHeight = this.game.config.height;

    this.add.text(
      0.5 * this.bg.displayWidth / 4,
      0.3 * this.bg.displayHeight / 4,
      'Wherefore art thou Romeo?',
      fontStyleQuestion
    );
    this.add.text(
      3.62 * this.bg.displayWidth / 4,
      2.8 * this.bg.displayHeight / 4,
      'Right here',
      fontStyleAnswer
    );
    this.add.text(
      1.65 * this.bg.displayWidth / 4,
      1.2 * this.bg.displayHeight / 4,
      'Baby I was born this way',
      fontStyleAnswer
    );

    this.avatar = new Avatar({
      scene: this,
      x: 100,
      y: 700,
      asset: avatarStr
    });
    this.add.existing(this.avatar);

    this.add.text(
      3.26 * this.bg.displayWidth / 4,
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
      3.36 * this.bg.displayWidth / 4,
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
