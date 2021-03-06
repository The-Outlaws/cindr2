import Phaser from 'phaser';

const width = window.innerWidth * window.devicePixelRatio;
const height = window.innerHeight * window.devicePixelRatio;
// const width = window.innerWidth;
// const height = window.innerHeight;

export default {
  type: Phaser.AUTO,
  parent: 'content',

  backgroundColor: '#ccccc',
  width: width,
  height: height,
  // autoCenter: Phaser.Scale.CENTER_BOTH,

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scale: {
    mode: Phaser.Scale.window
    // mode: Phaser.Scale.FIT,
    // width: width,
    // height: height
  },

  localStorageName: 'cindr'
};
