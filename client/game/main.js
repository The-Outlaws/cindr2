import Phaser from 'phaser';
import config from './config';
import Boot from './scenes/Boot.js';
import Splash from './scenes/Splash.js';

import QuestionRoom from './scenes/QuestionRoom.js';
import DestinationRoom from './scenes/DestinationRoom.js';

const gameConfig = Object.assign(config, {
  scene: [Boot, Splash, QuestionRoom, DestinationRoom]
});

export default class Game extends Phaser.Game {
  constructor(background) {
    super(gameConfig, background);
    this.background = background;
  }
}
