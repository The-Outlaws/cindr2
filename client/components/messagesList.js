import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Chat from './newMessageEntry';
import { MatchRequest } from './matchRequest';
import {
  getConversations,
  acceptConversation,
  rejectConversation
} from '../store';
import moment from 'moment';

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
        {filteredConvo.length ? (
          filteredConvo[0].isAccepted ? (
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
              <Chat conversationId={filteredConvo[0].id} />
            </div>
          ) : filteredConvo[0].matchId === this.props.user.id ? (
            <MatchRequest
              handleAccept={this.handleAccept}
              handleReject={this.handleReject}
              filteredConvo={filteredConvo}
            />
          ) : (
            <h4>
              Your request to chat with {filteredConvo[0].match.firstName}
              <img src={filteredConvo[0].match.avatar} /> is still pending!
            </h4>
          )
        ) : null}

        <div className="message-archive">
          {filteredConvo.length ? (
            filteredConvo[0].isAccepted ? (
              <h4 id="archive-header">Messages of Old</h4>
            ) : null
          ) : null}

          {filteredConvo.length ? (
            filteredConvo[0].messages
              .filter(message => {
                return moment(message.createdAt).isBefore(today, 'minute');
              })
              .map(message => <Message key={message.id} message={message} />)
          ) : (
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

{
  /* <h4>
                <img className='chat-av' src={filteredConvo[0].user.avatar} /> Your request to chat from {filteredConvo[0].user.firstName} is awaiting your approval!
                </h4>
                <div className="match-request">
                  <h4>Deets about {filteredConvo[0].user.firstName}:</h4>
                  <img src={filteredConvo[0].user.photo} alt="No photo" />
                  <p>Age: {filteredConvo[0].user.age}</p>
                  <p>Gender: {filteredConvo[0].user.gender}</p>
                  <p>Orientation: {filteredConvo[0].user.orientation}</p>
                  <p>Height: {filteredConvo[0].user.height}</p>
                  <div>
                    <button
                      id="accept"
                      type="submit"
                      onClick={evt =>
                        this.handleAccept(evt, filteredConvo[0].id)
                      }
                    >
                      Accept match request
                    </button>
                    <button
                      id="reject"
                      type="submit"
                      onClick={evt =>
                        this.handleReject(evt, filteredConvo[0].id)
                      }
                    >
                      Decline match request
                    </button>
                  </div>
                </div> */
}
