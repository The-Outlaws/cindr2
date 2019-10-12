import Phaser from 'phaser';
import Avatar from '../sprites/Avatar';
import store from '../../store';

const avatarStr = 'avatar';
const fontStyle = {
  // fontFamily: 'Press Start 2P',
  fontSize: '4em',
  color: '#FF0090'
};

export default class DestinationRoom extends Phaser.Scene {
  constructor() {
    super({ key: 'DestinationRoom' });
  }

  //decrements seconds every one second and displays countdown
  onEvent() {
    this.initialTime -= 1;
    this.text.setText(`Make a decision in: ${this.initialTime} seconds!`);
  }

  init() {
    this.playerSpeed = 10;
  }

  preload() {
    const { user: { avatar } } = store.getState();
    this.load.image(avatarStr, avatar);
    this.load.image('troll', '/troll128.png');
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

    this.add.text(200, 200, 'Wherefore art thou Romeo?', fontStyle);
    this.add.text(550, 500, 'Right here', fontStyle);
    this.add.text(300, 600, 'Baby I was born this way', fontStyle);

    this.avatar = new Avatar({
      scene: this,
      x: 100,
      y: 700,
      asset: avatarStr
    });
    this.add.existing(this.avatar);

    this.text = this.add.text(
      250,
      250,
      `Make a decision in: ${this.initialTime} seconds!`,
      fontStyle
    );

    this.initialTime = 15;

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
