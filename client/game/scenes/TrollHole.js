import Phaser from 'phaser';
import Avatar from '../sprites/Avatar';
import store from '../../store';

const avatarStr = 'avatar';

const fontStyleQuestion = {
  font: '6em Walter Turncoat',
  fill: '#32a852',
  align: 'center'
};

const fontStyleAnswer = {
  font: '3.4em Galindo',
  fill: '#e54567',
  align: 'center'
  // backgroundColor: 'white'
};

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

  create() {
    this.bg = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'officeTrollHole'
    );
    this.bg.displayWidth = this.game.config.width;
    this.bg.displayHeight = this.game.config.height;

    this.add.text(
      0.4 * this.bg.displayWidth / 4,
      0.3 * this.bg.displayHeight / 4,
      `Why are you here?`,
      fontStyleQuestion
    );
    this.answerA = this.add.text(
      2.8 * this.bg.displayWidth / 4,
      0.7 * this.bg.displayHeight / 4,
      `I didn't realize there was a countdown!\nI'll remember for next time.`,
      fontStyleAnswer
    );

    this.answerB = this.add.text(
      0.75 * this.bg.displayWidth / 4,
      2.1 * this.bg.displayHeight / 4,
      `Reflection\nAnswer 1`,
      fontStyleAnswer
    );

    this.answerC = this.add.text(
      3.15 * this.bg.displayWidth / 4,
      1.5 * this.bg.displayHeight / 4,
      `Reflection Answer 2`,
      fontStyleAnswer
    );

    this.answerD = this.add.text(
      1.5 * this.bg.displayWidth / 4,
      3.4 * this.bg.displayHeight / 4,
      `Reflection Answer 3`,
      fontStyleAnswer
    );
    this.physicsObjectA = this.physics.add.existing(this.answerA, 'static');
    this.physicsObjectB = this.physics.add.existing(this.answerB, 'static');
    this.physicsObjectC = this.physics.add.existing(this.answerC, 'static');
    this.physicsObjectD = this.physics.add.existing(this.answerD, 'static');

    this.avatar = this.physics.add.sprite(
      2.2 * this.bg.displayWidth / 4,
      3 * this.bg.displayHeight / 4,
      avatarStr
    );
    this.avatar.body.setAllowGravity(false);
    this.avatar.setCollideWorldBounds(true);

    this.physics.add.collider(
      this.avatar,
      this.physicsObjectA,
      () => {
        this.scene.restart('QuestionRoom');
      },
      null,
      this
    );

    this.physics.add.collider(
      this.avatar,
      this.physicsObjectB,
      () => {
        this.scene.restart('QuestionRoom');
      },
      null,
      this
    );

    this.physics.add.collider(
      this.avatar,
      this.physicsObjectC,
      () => {
        this.scene.start('QuestionRoom');
      },
      null,
      this
    );

    this.physics.add.collider(
      this.avatar,
      this.physicsObjectD,
      () => {
        this.scene.start('QuestionRoom');
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
    this.input.on('pointerdown', () => this.scene.start('DestinationRoom'));
  }
}
