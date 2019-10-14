import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Chat } from './newMessageEntry';
import { fetchMessages } from '../store';

export class MessagesList extends Component {
  // componentDidMount(){
  //   this.props.loadMessages()
  // }
  render() {
    const allConversations = this.props.conversations;
    const matchId = Number(this.props.match.params.matchId); // because it's a string "1", not a number!
    const filteredConvo = allConversations.filter(
      convo => convo.matchId === matchId || convo.userId === matchId
    );
    const currMessages = this.props.messages;
    return (
      <main>
        <Chat conversationId={filteredConvo[0].id} />
        <ul className="media-list">
          <h4>Now Messages</h4>
          {currMessages.map(message => (
            <Message
              key={message.id}
              message={message}
              user={this.props.user}
            />
          ))}
          <h4>Old Messages</h4>
          {filteredConvo[0].messages.map(message => (
            <Message key={message.id} message={message} />
          ))}
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
// const mapDispatchToProps = dispatch => ({
//   loadMessages: () => dispatch(fetchMessages())
// })
export default withRouter(connect(mapStateToProps, null)(MessagesList));
