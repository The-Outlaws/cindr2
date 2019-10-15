import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Chat from './newMessageEntry';
import { getConversations } from '../store';
import moment from 'moment';

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
    const today = moment();
    console.log('currMessages', currMessages);
    return (
      <main>
        <ul className="media-list">
          <h4>Recent Messages</h4>
          {currMessages.map(message => (
            <Message
              key={message.id}
              message={message}
              user={this.props.user}
            />
          ))}
          {filteredConvo.length ? (
            filteredConvo[0].isAccepted ? (
              <Chat conversationId={filteredConvo[0].id} />
            ) : filteredConvo[0].matchId === this.props.user.id ? (
              <React.Fragment>
                <h4>
                  Your request to chat from {filteredConvo[0].user.firstName}
                  <img src={filteredConvo[0].user.avatar} /> is awaiting your
                  approval!
                </h4>
                <div>
                  <h4>Deets about {filteredConvo[0].user.firstName}:</h4>
                  <img src={filteredConvo[0].user.photo} alt="No photo" />
                  <p>Age: {filteredConvo[0].user.age}</p>
                  <p>Gender: {filteredConvo[0].user.gender}</p>
                  <p>Orientation: {filteredConvo[0].user.orientation}</p>
                  <p>Height: {filteredConvo[0].user.height}</p>
                </div>
                <button type="submit">Accept match request</button>
                <button type="submit">Decline match request</button>
              </React.Fragment>
            ) : (
              <h4>
                Your request to chat with {filteredConvo[0].match.firstName}
                <img src={filteredConvo[0].match.avatar} /> is still pending!
              </h4>
            )
          ) : null}
          {filteredConvo.length ? (
            filteredConvo[0].isAccepted ? (
              <h4>Messages of Yesterday and Beyond</h4>
            ) : null
          ) : null}
          {filteredConvo.length ? (
            filteredConvo[0].messages
              .filter(message => {
                return moment(message.createdAt).isBefore(today, 'hour');
              })
              .map(message => <Message key={message.id} message={message} />)
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
