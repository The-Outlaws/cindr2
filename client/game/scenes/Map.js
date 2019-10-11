import Phaser, { GameObjects } from 'phaser';
import Avatar from '../sprites/Avatar';
import store from '../../store';

const avatarStr = 'avatar';
const fontStyle = {
  // fontFamily: 'Press Start 2P',
  fontSize: '4em'
};

export default class QuestionRoom extends Phaser.Scene {
  constructor() {
    super({ key: 'QuestionRoom' });
  }
  init() {
    this.playerSpeed = 10;
  }

  preload() {
    const { user: { avatar } } = store.getState();
    this.load.image('crystalBackground', '/CrystalScene.png');
    this.load.image(avatarStr, avatar);
    this.load.image('pointer', '/heart.png');
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

    this.add.text(
      this.bg.displayWidth / 2,
      this.bg.displayHeight / 4,
      'My Adventure',
      fontStyle
    );

    // Adding markers for past locations visited
    // for loop through the rooms array from state - for each element of array.length-2, this.add.image(array[i].x, array[i].y, 'pointer')

    // for last element of rooms array, Adding avatar to last visited location, which should be their current room

    // this.avatar = new Avatar({
    //   scene: this,
    //   x: arr[arr.length-1[x]],
    //   y: arr[arr.length-1[y]],
    //   asset: 'avatarStr'
    // });
  }

  update() {}
}
