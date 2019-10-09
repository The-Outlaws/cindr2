import Phaser from 'phaser'

const width = window.innerWidth * window.devicePixelRatio
const height = window.innerHeight * window.devicePixelRatio

export default {
  type: Phaser.AUTO,
  parent: 'content',

  backgroundColor: '#ccccc',
  width: width,
  height: height,

  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 200}
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    width: width,
    height: height
  },

  localStorageName: 'cindr'
}
