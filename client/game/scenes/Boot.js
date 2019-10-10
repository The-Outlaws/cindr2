import Phaser from 'phaser';

export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    this.load.image('troll512', '/troll512.png');

    this.add.text(300, 300, 'loading...', { fill: '#9CCC65', font: '64px' });
    //this.add.image(this.game.config.width/2, this.game.config.height/2, 'troll512')

    this.load.image('troll', '/troll128.png');
    this.load.image('crystalBackground', '/CrystalScene.png');
    this.load.image('officeTrollHole', '/OfficeTrollHole.png');
  }

  update() {
    this.scene.start('Splash');
  }
}
