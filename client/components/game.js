import React from 'react';
import Game from '../game/main.js';

export default class GameContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      game: null
    };
  }
  componentDidMount() {
    this.setState({ game: new Game() });
  }

  componentWillUnmount() {
    this.state.game.destroy(true);
  }

  render() {
    return <div className="game" />;
  }
}
