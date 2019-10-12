import Phaser from 'phaser';
import WebFont from 'webfontloader';

export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
    this.load.image('troll512', '/troll512.png');

    this.add.text(300, 300, 'loading...', { fill: '#9CCC65', font: '64px' });
    //this.add.image(this.game.config.width/2, this.game.config.height/2, troll)

    this.load.image('troll', '/troll128.png');
    this.load.image('crystalBackground', '/CrystalScene.png');
    this.load.image('officeTrollHole', '/OfficeTrollHole.png');

    WebFont.load({
      google: {
        families: [
          'Fugaz One',
          'Merienda',
          'Chewy',
          'VT323',
          'Marmelad',
          'Indie Flower',
          'Pangolin',
          'Walter Turncoat',
          'Galindo',
          'Piedra'
        ]
      },
      active: this.fontsLoaded
    });
  }
  create() {}

  update() {
    if (this.fontsReady) {
      this.scene.start('Splash');
    }
  }

  fontsLoaded() {
    this.fontsReady = true;
  }
}
