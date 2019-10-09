import Phaser from 'phaser';
import Avatar from '../sprites/Avatar';

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
    // Background image
    this.bg = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'crystalBackground'
    );
    this.bg.displayWidth = this.game.config.width;
    this.bg.displayHeight = this.game.config.height;

    this.add.text(450, 450, 'Question question?');

    // Game Objects Leading to Different Rooms
    this.answerA = this.add.text(100, 600, 'Anser Anser');

    // Makes your life choices fall away !!
    this.physicsObjectA = this.physics.add.existing(this.answerA);
    this.physicsObjectA.onCollide = true;

    this.answerB = this.add.text(300, 600, 'Anwer Anwer');

    // Avatar
    this.avatar = new Avatar({
      scene: this,
      x: 100,
      y: 700,
      asset: 'troll'
    });
    this.add.existing(this.avatar);

    this.physics.add.collider(
      this.avatar,
      this.answerA,
      () => {
        console.log('hello');
        //this.game.scene.start('DestinationRoom')
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
