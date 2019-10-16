import Phaser from 'phaser';
import store from '../../store';

const avatarStr = 'avatar';

export default class Splash extends Phaser.Scene {
  constructor() {
    super({ key: 'Splash' });
  }

  init() {
    this.playerSpeed = 10;
  }

  preload() {
    const { user: { avatar } } = store.getState();
    this.load.image(avatarStr, avatar);
  }

  create() {
    this.backgroundColor = 'black';

    this.add.text(
      1.57 * this.game.config.width / 4,
      1.1 * this.game.config.height / 4,
      'Move your avatar with \nup/down arrow keys\nMove into text to make selection',
      {
        fill: 'white',
        font: '4em Walter Turncoat',
        align: 'center'
      }
    );

    this.start = this.add.text(
      1.65 * this.game.config.width / 4,
      1.6 * this.game.config.height / 4,
      'Start Adventure',
      {
        fill: 'white',
        font: '6em Walter Turncoat'
      }
    );

    this.physicsObjectStart = this.physics.add.existing(this.start, 'static');

    this.avatar = this.physics.add.sprite(
      this.game.config.width / 4,
      4 * this.game.config.height / 5,
      avatarStr
    );
    this.avatar.body.setAllowGravity(false);
    this.avatar.setCollideWorldBounds(true);

    this.physics.add.collider(
      this.avatar,
      this.physicsObjectStart,
      () => {
        this.scene.start('QuestionOne');
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
