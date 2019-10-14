import React from 'react';
import { connect } from 'react-redux';
import { postMessage } from '../store/reducers/messages';
import { writeMessage } from '../store/reducers/newMessage';

function NewMessageEntry(props) {
  const { newMessage, user, handleChange, handleSubmit } = props;
  const sendToBack = {
    content: newMessage,
    userId: user.id,
    conversationId: props.conversationId
  };
  return (
    <form
      id="new-message-form"
      onSubmit={evt => {
        // console.log('message in handlesubmit', newMessage);
        handleSubmit(sendToBack, evt);
      }}
    >
      <div className="input-group input-group-lg">
        <input
          className="form-control"
          type="text"
          name="content"
          value={newMessage}
          onChange={handleChange}
          placeholder="Say something nice..."
        />
        <span className="input-group-btn">
          <button className="btn btn-default" type="submit">
            Chat!
          </button>
        </span>
      </div>
    </form>
  );
}

const mapStateToProps = function(state) {
  return {
    user: state.user,
    newMessage: state.newMessage,
    messages: state.messages
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    handleChange(evt) {
      dispatch(writeMessage(evt.target.value));
    },
    handleSubmit(sendToBack, evt) {
      evt.preventDefault();

      // const { channelId } = ownProps;

      dispatch(postMessage(sendToBack));
      dispatch(writeMessage(''));
    }
  };
};

const Chat = connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);
export default Chat;
