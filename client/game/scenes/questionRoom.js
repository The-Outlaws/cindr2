import Phaser from 'phaser';
import Avatar from '../sprites/Avatar';
import Background from '../sprites/Background';

export default class QuestionRoom extends Phaser.Scene {
  constructor() {
    super({ key: 'QuestionRoom' });
  }
  init() {
    this.playerSpeed = 10;
  }

  preload() {
    this.load.image('crystalBackground', '/CrystalScene.png');
    this.load.image('troll', '/troll128.png');
  }

  create() {
    this.bg = new Background({
      scene: this,
      x: this.game.config.width / 2,
      y: this.game.config.height / 2,
      width: this.game.config.width,
      height: this.game.config.height,
      asset: 'crystalBackground'
    });
    this.add.existing(this.bg);
    //this.add.image(this.game.config.width, this.game.config.height/2, 'crystalBackground')
    this.add.text(450, 450, 'Question question?');
    this.add.text(100, 600, 'Anser Anser');
    this.add.text(300, 600, 'Anwer Anwer');

    this.avatar = new Avatar({
      scene: this,
      x: 100,
      y: 700,
      asset: 'troll'
    });
    //this.avatar.body.setVelocity(100, 200).setCollideWorldBounds(true)
    this.add.existing(this.avatar);
    //this.add.existing(this.bg)

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
