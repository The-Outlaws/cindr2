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
    if (!this.state.game) this.setState({game: new Game()})
    else {
      this.state.game.scene.start('Boot')
    }
  }

  render() {
    return <div className="game" />
  }
}
