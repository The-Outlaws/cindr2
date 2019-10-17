import React from 'react';
import { connect } from 'react-redux';
// import {getUser} from '../store'
import Game from '../game/main.js';
import { getActiveUsers } from '../store/index.js';
//import getRoomThunk, {addRoomThunk} from '../store/reducers/room'
// import { gotActiveRoom } from '../store/reducers/room';

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
    // this.props.gotActiveRoom(this.props.userId);
    // this.props.gotUser(this.props.userId)
    this.props.getUsers(7, this.props.userId);
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
    rooms: state.room,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  // gotActiveRoom: userId => dispatch(gotActiveRoom(userId))
  // gotUser: (userId) => dispatch(getUser(userId))
  getUsers: (room, userId) => dispatch(getActiveUsers(room, userId))
});

const GameContainer = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedGameContainer
);
export default GameContainer;
