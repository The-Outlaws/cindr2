import React from 'react'
import Game from '../game/main.js'

export default class GameContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      game: null
    }
  }
  componentDidMount() {
    this.game = new Game()
  }

  render() {
    return <div>This is where your game lives!</div>
  }
}
