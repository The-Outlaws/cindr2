import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MatchChannel from './matchChannel';

export class MatchesList extends Component {
  render() {
    const activeConvos = this.props.conversations.filter(
      convo => convo.isAccepted === true
    );

    return (
      <div id="chat-sidebar">
        <h4>Match List</h4>
        <ul>
          {activeConvos.map(convo => {
            return (
              <MatchChannel
                key={convo.id}
                matchUser={convo.match}
                messages={convo.messages.length}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapState = state => ({
  conversations: state.conversations
});

export default withRouter(connect(mapState)(MatchesList));
