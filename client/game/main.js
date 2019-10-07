import Phaser from 'phaser'
import config from './config'
import QuestionRoom from './scenes/questionRoom.js'

const gameConfig = Object.assign(config, {
  scene: [QuestionRoom]
})

export default class Game extends Phaser.Game {
  constructor() {
    super(gameConfig)
  }
}
