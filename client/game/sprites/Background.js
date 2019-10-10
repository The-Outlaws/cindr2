import Phaser from 'phaser';

export default class extends Phaser.GameObjects.TileSprite {
  constructor({ scene, x, y, width, height, asset }) {
    super(scene, x, y, width, height, asset);
  }
}
