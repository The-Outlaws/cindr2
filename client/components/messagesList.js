import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Chat from './newMessageEntry';
import { getConversations } from '../store';

class disconnectedMessagesList extends Component {
  componentDidMount() {
    this.props.fetchConvos();
  }
  render() {
    const allConversations = this.props.conversations;
    const matchId = Number(this.props.match.params.matchId); // because it's a string "1", not a number!
    const filteredConvo = allConversations.filter(
      convo => convo.matchId === matchId || convo.userId === matchId
    );
    const uniqueMessages = [...new Set(this.props.messages)];
    const currMessages = uniqueMessages.filter(message => {
      return message.conversationId === filteredConvo[0].id;
    });
    console.log('currMessages', currMessages);
    return (
      <main>
        <ul className="media-list">
          <h4>Now Messages</h4>
          {currMessages.map(message => (
            <Message
              key={message.id}
              message={message}
              user={this.props.user}
            />
          ))}
          {filteredConvo.length ? (
            <Chat conversationId={filteredConvo[0].id} />
          ) : (
            <h4>Your message history is loading</h4>
          )}
          <h4>Old Messages</h4>
          {filteredConvo.length ? (
            filteredConvo[0].messages.map(message => (
              <Message key={message.id} message={message} />
            ))
          ) : (
            <h4>Your message history is loading</h4>
          )}
        </ul>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  conversations: state.conversations,
  messages: state.messages,
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  fetchConvos: () => dispatch(getConversations())
});

const MessagesList = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(disconnectedMessagesList)
);
export default MessagesList;
