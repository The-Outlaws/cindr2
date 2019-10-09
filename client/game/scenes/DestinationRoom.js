import Phaser from 'phaser';
import Avatar from '../sprites/Avatar';

export default class DestinationRoom extends Phaser.Scene {
  constructor() {
    super({ key: 'DestinationRoom' });
  }
  init() {
    this.playerSpeed = 10;
  }

  preload() {
    this.load.image('troll', '/troll128.png');
  }

  create() {
    this.add.text(200, 200, 'Wherefore art thou Romeo?');
    this.add.text(550, 500, 'Right here');
    this.add.text(300, 600, 'Baby I was born this way');

    this.avatar = new Avatar({
      scene: this,
      x: 100,
      y: 700,
      asset: 'troll'
    });
    this.add.existing(this.avatar);

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
