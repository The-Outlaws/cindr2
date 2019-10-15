import Phaser from 'phaser';

export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    this.load.image('troll', '/troll128.png');
    this.load.image('crystalBackground', '/CrystalScene.png');
  }

  update() {
    this.scene.start('QuestionRoom');
  }
}
