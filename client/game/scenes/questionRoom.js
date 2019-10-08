import Phaser from 'phaser'
// import troll from '../../../public/'

export default class QuestionRoom extends Phaser.Scene {
  constructor() {
    super({key: 'questionRoom'})
  }
  init() {}
  preload() {
    this.load.image('troll', 'public/troll128.png')
  }

  create() {
    this.add.text(450, 450, 'Question question?')
    this.add.text(100, 600, 'Anser Anser')
    this.add.text(100, 600, 'Anwer Anwer')
    this.add.image(200, 800, 'troll')
  }
}
