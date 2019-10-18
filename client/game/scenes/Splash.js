import Phaser from 'phaser';
import store from '../../store';
// import {getUser} from '../../store'

const avatarStr = 'avatar';

export default class Splash extends Phaser.Scene {
  constructor() {
    super({ key: 'Splash' });
  }

  init() {
    this.playerSpeed = 10;
    this.usedCursor = false;
  }

  preload() {
    const { user: { avatar } } = store.getState();
    this.load.image(avatarStr, avatar);
    this.load.image('arrows', 'arrowkeys.png');
    //this.load.image('graaass', 'graaass.png')
  }

  create() {
    this.backgroundColor = 'black';
    this.bg = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'starryNight'
    );
    this.bg.displayWidth = this.game.config.width;
    this.bg.displayHeight = this.game.config.height;

    this.instructions = this.add.text(
      this.game.config.width / 6,
      1.1 * this.game.config.height / 4,
      'Use arrow keys to move your avatar',
      {
        fill: 'white',
        font: '4em Walter Turncoat',
        align: 'center'
      }
    );

    this.start = this.add.text(
      2.6 * this.game.config.width / 4,
      3 * this.game.config.height / 4,
      'Start Adventure',
      {
        fill: 'white',
        font: '6em Walter Turncoat'
      }
    );
    // const line = new Phaser.Geom.Line(
    //   this.game.config.width / 6,
    //   this.game.config.height / 5,
    //   this.game.config.width / 6,
    //   3 * this.game.config.height / 4
    // );
    // const line2 = new Phaser.Geom.Line(
    //   this.game.config.width / 6,
    //   3 * this.game.config.height / 4 + 20,
    //   2.6 * this.game.config.width / 4 - 20,
    //   3 * this.game.config.height / 4 + 20
    // );
    // var graphics = this.add.graphics({
    //   lineStyle: { width: 10, color: 0xffffff }
    // });

    // graphics.strokeLineShape(line);
    // graphics.strokeLineShape(line2);

    this.physicsObjectStart = this.physics.add.existing(this.start, 'static');

    this.avatar = this.physics.add.sprite(
      this.game.config.width / 6,
      3 * this.game.config.height / 4,
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
    // this.add.image(
    //   this.game.config.width / 2 + 100,
    //   this.game.config.height / 2 + 40,
    //   'arrows'
    // );
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (
      this.cursors.left.isDown ||
      this.cursors.right.isDown ||
      this.cursors.up.isDown ||
      this.cursors.down.isDown
    ) {
      this.usedCursor = true;
    }

    if (this.usedCursor) {
      this.instructions.destroy();
      this.add.text(
        this.game.config.width / 6,
        1.1 * this.game.config.height / 4,
        'To start your adventure, glide into "Start Adventure" portal',
        {
          fill: 'white',
          font: '4em Walter Turncoat',
          align: 'center'
        }
      );
    }

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
