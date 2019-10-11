import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export const MessagesList = props => {
  // const userId = Number(props.user.id)
  const messages = props.messages;
  const filteredMessages = messages.filter(
    message => message.userId === props.user.id
  );

  return (
    <div>
      <ul className="media-list">
        {filteredMessages.map(message => (
          <Message message={message} key={message.id} />
        ))}
      </ul>
      {/* <Chat matchId={ matchId }/> */}
    </div>
  );
};

const mapStateToProps = state => ({
  messages: state.messages,
  user: state.user
});

export default withRouter(connect(mapStateToProps)(MessagesList));
