import Phaser from 'phaser';
import Avatar from '../sprites/Avatar';
import store from '../../store';

const avatarStr = 'avatar';

const fontStyleQuestion = {
  font: '5.5em Piedra',
  fill: '#ff2525',
  align: 'center'
};
const fontStyleAnswer = {
  font: '4.5em Piedra',
  fill: '#b81b1b'
};
const fontStyleCountdown = {
  font: '4.5em Piedra',
  fill: '#b81b1b',
  align: 'center'
};

export default class DestinationRoom extends Phaser.Scene {
  constructor() {
    super({ key: 'DestinationRoom2' });
  }

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
    this.load.image('evilCastle', '/CastleScene.png');
  }

  create() {
    this.bg = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'evilCastle'
    );
    this.bg.displayWidth = this.game.config.width;
    this.bg.displayHeight = this.game.config.height;

    this.add.text(
      0.2 * this.bg.displayWidth / 4,
      0.2 * this.bg.displayHeight / 4,
      'Would you rather eat \neye of newt or toenail of cat?',
      fontStyleQuestion
    );
    this.add.text(
      2.9 * this.bg.displayWidth / 4,
      1.5 * this.bg.displayHeight / 4,
      'eye eye eye',
      fontStyleAnswer
    );
    this.add.text(
      this.bg.displayWidth / 4,
      2.4 * this.bg.displayHeight / 4,
      'meowth',
      fontStyleAnswer
    );

    this.avatar = new Avatar({
      scene: this,
      x: this.bg.displayWidth / 2,
      y: 4 * this.bg.displayHeight / 5,
      asset: avatarStr
    });
    this.add.existing(this.avatar);

    this.add.text(
      3.5 * this.bg.displayWidth / 4,
      this.bg.displayHeight / 23.5,
      'You have: ',
      fontStyleCountdown
    );

    this.add.text(
      3.33 * this.bg.displayWidth / 4,
      this.bg.displayHeight / 8,
      'seconds\nto answer this question!',
      fontStyleCountdown
    );

    this.initialTime = 15;
    this.countDownText = this.add.text(
      3.6 * this.bg.displayWidth / 4,
      this.bg.displayHeight / 12.8,
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
