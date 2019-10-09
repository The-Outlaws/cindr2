import Phaser from 'phaser';
import config from './config';
import QuestionRoom from './scenes/QuestionRoom.js';
import DestinationRoom from './scenes/DestinationRoom.js';
import Boot from './scenes/Boot.js';

const gameConfig = Object.assign(config, {
  scene: [QuestionRoom, Boot, DestinationRoom]
});

export default class Game extends Phaser.Game {
  constructor() {
    super(gameConfig);
  }
}
