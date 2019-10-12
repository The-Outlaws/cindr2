import Phaser from 'phaser';
import Avatar from '../sprites/Avatar';
import store from '../../store';

const avatarStr = 'avatar';
export default class TrollHole extends Phaser.Scene {
  constructor() {
    super({ key: 'TrollHole' });
  }
  init() {
    this.playerSpeed = 10;
  }

  preload() {
    const { user: { avatar } } = store.getState();
    this.load.image(avatarStr, avatar);
    // this.load.image('troll', '/troll128.png');
    this.load.image('officeTrollHole', '/OfficeTrollHole.png');
  }

  // create() {
  //   // Background image
  //   this.bg = this.add.image(
  //     this.game.config.width / 2,
  //     this.game.config.height / 2,
  //     'officeTrollHole'
  //   );

  //   this.add.text(200, 60, 'Reflect', {
  //     font: '24px',
  //     fill: '#e54567'
  //   });

  //   // Game Objects Leading to Different Rooms
  //   this.answerA = this.add.text(300, 600, 'Take me back!', {
  //     font: '18px',
  //     fill: '#e54567'
  //   });

  //   // Makes your life choices fall away !! aka adds answerA to physics
  //   this.physicsObjectA = this.physics.add.existing(this.answerA, 'static');
  //   // this.physicsObjectA.onCollide = true;

  //   this.answerB = this.add.text(
  //     550,
  //     500,
  //     'Stay here and continue to reflect',
  //     {
  //       font: '18px',
  //       fill: '#e54567'
  //     }
  //   );
  //   this.physicsObjectB = this.physics.add.existing(this.answerB, 'static');

  //   //adds sprite to physics object, disables gravity so it doesn't fall
  //   this.avatar = this.physics.add.sprite(
  //     this.bg.displayWidth / 2,
  //     4 * this.bg.displayHeight / 5,
  //     avatarStr
  //   );
  //   this.avatar.body.setAllowGravity(false);

  //   //creates a collision between sprite and answer, triggers room change
  //   this.physics.add.collider(
  //     this.avatar,
  //     this.physicsObjectA,
  //     () => {
  //       // console.log('hello');
  //       this.scene.start('DestinationRoom');
  //     },
  //     null,
  //     this
  //   );

  //   // Variable containing up/down/right/left keys
  //   this.cursors = this.input.keyboard.createCursorKeys();
  // }

  create() {
    this.bg = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'officeTrollHole'
    );
    this.bg.displayWidth = this.game.config.width;
    this.bg.displayHeight = this.game.config.height;

    this.add.text(200, 60, 'Reflect', {
      font: '24px',
      fill: '#e54567'
    });
    this.add.text(550, 500, 'Stay here and continue to reflect', {
      font: '18px',
      fill: '#e54567'
    });
    this.add.text(300, 600, 'Take me back!', {
      font: '18px',
      fill: '#e54567'
    });

    this.avatar = new Avatar({
      scene: this,
      x: 100,
      y: 700,
      asset: avatarStr
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
