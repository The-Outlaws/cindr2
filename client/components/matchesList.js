import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MatchChannel from './matchChannel';

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
          {activeConvos.length > 0 ? (
            activeConvos.map(convo => {
              return (
                <MatchChannel
                  key={convo.id}
                  convoId={convo.id}
                  convo={convo}
                  matchUser={
                    convo.match.id === this.props.user.id
                      ? convo.user
                      : convo.match
                  }
                />
              );
            })
          ) : (
            <li>🙄No matches yet!</li>
          )}
        </ul>
        <h4>New Match Requests</h4>
        <ul>
          {requestConvos.length > 0 ? (
            requestConvos.map(convo => {
              return (
                <MatchChannel
                  key={convo.id}
                  matchUser={convo.user}
                  convo={convo}
                />
              );
            })
          ) : (
            <li>🤷No new requests</li>
          )}
        </ul>
        <h4>Pending Matches</h4>
        <ul>
          {pendingConvos.length > 0 ? (
            pendingConvos.map(convo => {
              return (
                <MatchChannel
                  key={convo.id}
                  matchId={convo.matchId}
                  matchUser={convo.match}
                  convo={convo}
                />
              );
            })
          ) : (
            <li>🤦No matches pending</li>
          )}
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
