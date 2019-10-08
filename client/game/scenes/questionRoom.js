import Phaser from 'phaser'

export default class QuestionRoom extends Phaser.Scene {
  constructor() {
    super({key: 'QuestionRoom'})
  }
  init() {}
  preload() {
    this.load.image('troll', '/troll128.png')
  }

  create() {
    this.add.text(450, 450, 'Question question?')
    this.add.text(100, 600, 'Anser Anser')
    this.add.text(300, 600, 'Anwer Anwer')
    this.add.image(200, 700, 'troll')
  }
}
