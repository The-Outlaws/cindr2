import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MatchChannel from './matchChannel';
// import { fetchMessages } from '../store';

export class MatchesList extends Component {
  render() {
    const activeConvos = this.props.conversations.filter(
      convo => convo.isAccepted === true
    );
    const pendingConvos = this.props.conversations.filter(
      convo => convo.isAccepted === false && convo.isRejected === false
    );
    return (
      <div id="chat-sidebar">
        <h4>Match List</h4>
        <ul>
          {activeConvos.map(convo => {
            return (
              <MatchChannel
                key={convo.id}
                convoId={convo.id}
                matchUser={
                  convo.match.id === this.props.user.id
                    ? convo.user
                    : convo.match
                }
                messages={convo.messages.length}
              />
            );
          })}
        </ul>
        <h4>Pending Matches</h4>
        <ul>
          {pendingConvos.map(convo => {
            return <MatchChannel key={convo.id} matchUser={convo.match} />;
          })}
        </ul>
      </div>
    );
  }
}

const mapState = state => ({
  conversations: state.conversations,
  user: state.user
  // messages: state.messages
});
// const mapDispatch = dispatch => ({
//   loadMessages: () => dispatch(fetchMessages())
// })
export default withRouter(connect(mapState)(MatchesList));
