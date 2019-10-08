import Phaser from 'phaser'

export default {
  type: Phaser.AUTO,
  parent: 'content',

  backgroundColor: '#ccccc',
  //width: window.innerWidth * window.devicePixelRatio,
  //height: window.innerWidth * window.devicePixelRatio,

  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 200}
    }
  },

  localStorageName: 'cindr'
}
