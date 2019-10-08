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
    this.setState({game: new Game()})
  }

  componentWillUnmount() {
    this.state.game.destroy(true)
  }

  render() {
    return <div className="game" />
  }
}
// const GameContainer = (props) => {
//   return (
//     <div id='game-container'></div>
//   )
// }

// const mapStateToProps = () => ({

// })

// export default connect(mapStateToProps)(GameContainer)
