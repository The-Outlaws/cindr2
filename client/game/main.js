import Phaser from 'phaser';
import config from './config';
import Boot from './scenes/Boot.js';
import Splash from './scenes/Splash.js';

import QuestionRoom from './scenes/questionRoom.js';
import DestinationRoom from './scenes/DestinationRoom.js';
import DestinationRoom2 from './scenes/DestinationRoom2.js';
import TrollHole from './scenes/TrollHole.js';

const gameConfig = Object.assign(config, {
  scene: [
    Boot,
    Splash,
    QuestionRoom,
    DestinationRoom,
    DestinationRoom2,
    TrollHole
  ]
});

export default class Game extends Phaser.Game {
  constructor(background) {
    super(gameConfig, background);
    this.background = background;
  }
}
