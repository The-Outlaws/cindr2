import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Chat } from './newMessageEntry';

export class MessagesList extends Component {
  render() {
    const allConversations = this.props.conversations;
    const matchId = Number(this.props.match.params.matchId); // because it's a string "1", not a number!
    const filteredConvo = allConversations.filter(
      convo => convo.matchId === matchId
    );
    return (
      <div>
        <ul className="media-list">
          {filteredConvo[0].messages.map(message => (
            <Message key={message.id} message={message} />
          ))}
        </ul>
        <Chat conversationId={filteredConvo[0].id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  conversations: state.conversations
});

export default withRouter(connect(mapStateToProps)(MessagesList));
