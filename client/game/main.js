import Phaser from 'phaser';
import config from './config';
import Boot from './scenes/Boot.js';
import Splash from './scenes/Splash.js';

import QuestionOne from './scenes/QuestionOne.js';
import QuestionTwo from './scenes/QuestionTwo.js';
import QuestionThree from './scenes/QuestionThree.js';
import QuestionFour from './scenes/QuestionFour.js';
import QuestionFive from './scenes/QuestionFive.js';
import QuestionSix from './scenes/QuestionSix.js';
import QuestionSeven from './scenes/QuestionSeven.js';
import QuestionEight from './scenes/QuestionEight.js';
import QuestionNine from './scenes/QuestionNine.js';
import QuestionTen from './scenes/QuestionTen.js';
import QuestionEleven from './scenes/QuestionEleven.js';
import QuestionTwelve from './scenes/QuestionTwelve.js';
import QuestionThirteen from './scenes/QuestionThirteen.js';
import QuestionFourteen from './scenes/QuestionFourteen.js';
import QuestionFifteen from './scenes/QuestionFifteen.js';
import QuestionSixteen from './scenes/QuestionSixteen.js';
import QuestionSeventeen from './scenes/QuestionSeventeen.js';
import QuestionEighteen from './scenes/QuestionEighteen.js';
import QuestionNineteen from './scenes/QuestionNineteen.js';
import QuestionTwenty from './scenes/QuestionTwenty.js';
import QuestionTwentyOne from './scenes/QuestionTwentyOne.js';
import DestinationRoom from './scenes/DestinationRoom.js';
import TrollHole from './scenes/TrollHole.js';

const gameConfig = Object.assign(config, {
  scene: [
    Boot,
    Splash,
    QuestionOne,
    QuestionThree,
    QuestionTwo,
    QuestionFour,
    QuestionFive,
    QuestionSix,
    QuestionSeven,
    QuestionEight,
    QuestionNine,
    QuestionTen,
    QuestionEleven,
    QuestionTwelve,
    QuestionThirteen,
    QuestionFourteen,
    QuestionFifteen,
    QuestionSixteen,
    QuestionSeventeen,
    QuestionEighteen,
    QuestionNineteen,
    QuestionTwenty,
    QuestionTwentyOne,
    DestinationRoom,
    TrollHole
  ]
});

export default class Game extends Phaser.Game {
  constructor(background) {
    super(gameConfig, background);
    this.background = background;
  }
}
