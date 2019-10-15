import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MatchChannel from './matchChannel';
// import { fetchMessages } from '../store';

class disconnectedMatchesList extends Component {
  render() {
    const activeConvos = this.props.conversations.filter(
      convo => convo.isAccepted === true
    );
    const pendingConvos = this.props.conversations.filter(
      convo =>
        convo.isAccepted === false &&
        convo.isRejected === false &&
        convo.userId === this.props.user.id
    );
    const requestConvos = this.props.conversations.filter(
      convo =>
        convo.isAccepted === false &&
        convo.isRejected === false &&
        convo.matchId === this.props.user.id
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
              />
            );
          })}
        </ul>
        <h4>New Match Requests!</h4>
        <ul>
          {requestConvos.map(convo => {
            return <MatchChannel key={convo.id} matchUser={convo.match} />;
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
});

const MatchesList = withRouter(connect(mapState)(disconnectedMatchesList));
export default MatchesList;
