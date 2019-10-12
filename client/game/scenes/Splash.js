import Phaser from 'phaser';

export default class Splash extends Phaser.Scene {
  constructor() {
    super({ key: 'Splash' });
    this.loadGame = this.loadGame.bind(this);
    this.hoverState = this.hoverState.bind(this);
    this.restState = this.restState.bind(this);
  }

  preload() {}

  create() {
    this.startButton = this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 2,
        'Start Adventure',
        {
          fill: '#9CCC65',
          font: '64px Walter Turncoat'
        }
      )
      .setInteractive()
      .on('pointerover', () => this.hoverState())
      .on('pointerout', () => this.restState())
      .on('pointerdown', () => this.loadGame());
  }

  loadGame() {
    this.scene.start('QuestionRoom');
  }
  hoverState() {
    this.clickButton.setStyle({ fill: '#FF5733' });
  }
  restState() {
    this.clickButton.setStyle({ fill: '#FFC300' });
  }
}
