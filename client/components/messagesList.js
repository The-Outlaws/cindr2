import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import Message from './Message';
import Chat from './newMessageEntry';
import { MatchRequest } from './matchRequest';
import {
  getConversations,
  acceptConversation,
  rejectConversation
} from '../store';


class disconnectedMessagesList extends Component {
  constructor(props) {
    super(props);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }
  componentDidMount() {
    this.props.fetchConvos();
  }
  handleAccept(evt, convoId) {
    evt.preventDefault();
    this.props.acceptRequest({
      isAccepted: true,
      isRejected: false,
      conversationId: convoId
    });
  }
  handleReject(evt, convoId) {
    evt.preventDefault();
    this.props.rejectRequest({
      isAccepted: false,
      isRejected: true,
      conversationId: convoId
    });
  }
  render() {
    const allConversations = this.props.conversations;
    const matchId = Number(this.props.match.params.matchId);
    const filteredConvo = allConversations.find(
      convo => convo.matchId === matchId || convo.userId === matchId
    );
    const currMessages = this.props.messages.filter(message => {
      return message.conversationId === filteredConvo.id;
    });

    const today = moment();

    return (
      <main>
        {filteredConvo ?
          filteredConvo.isAccepted ? (
            <div>
              <h4>Recent Messages</h4>
              <ul className="media-list">
                {currMessages.map(message => (
                  <Message
                    key={message.id}
                    message={message}
                    user={this.props.user}
                  />
                ))}
              </ul>
              <Chat conversationId={filteredConvo.id} />
            </div>
          ) : filteredConvo.matchId === this.props.user.id ? (
            <MatchRequest
              handleAccept={this.handleAccept}
              handleReject={this.handleReject}
              filteredConvo={filteredConvo}
            />
          ) : (
            <h4>
              Your request to chat with {filteredConvo.match.firstName}
              <img src={filteredConvo.match.avatar} /> is still pending!
            </h4>
          ) : null
        }

        <div className="message-archive">
          {filteredConvo ?
            filteredConvo.isAccepted ?
              <h4 id="archive-header">Messages of Old</h4>
             : null
             : null
         }

          {filteredConvo ?
            filteredConvo.messages
              .filter(message => {
                return moment(message.createdAt).isBefore(today, 'second');
              })
              .map(message => <Message key={message.id} message={message} />)
           : (
            <h4>Your message history is loading</h4>
          )}
        </div>
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
  fetchConvos: () => dispatch(getConversations()),
  acceptRequest: convoId => dispatch(acceptConversation(convoId)),
  rejectRequest: convoId => dispatch(rejectConversation(convoId))
});

const MessagesList = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(disconnectedMessagesList)
);
export default MessagesList;
