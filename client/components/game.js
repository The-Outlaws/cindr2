import React from 'react';
import { connect } from 'react-redux';

import Game from '../game/main.js';
//import getRoomThunk, {addRoomThunk} from '../store/reducers/room'
import { gotActiveRoom } from '../store/reducers/room';

class DisconnectedGameContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      game: null
    };
  }
  componentDidMount() {
    // This should return the last active room or create assocation
    // between the current user and the first room
    //this.props.gotActiveRoom(this.props.userId);

    this.setState({ game: new Game() });
  }

  componentWillUnmount() {
    this.state.game.destroy(true);
  }

  render() {
    return <div className="game" />;
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    rooms: state.room
  };
};

// const mapDispatchToProps = dispatch => ({
//   gotActiveRoom: userId => dispatch(gotActiveRoom(userId))
// });

const GameContainer = connect(mapStateToProps, null)(DisconnectedGameContainer);
export default GameContainer;
