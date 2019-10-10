import React from 'react';
import { connect } from 'react-redux';
import { postMessage } from '../store/reducers/messages';
import { writeMessage } from '../store/reducers/newMessage';

function NewMessageEntry(props) {
  const { newMessage, user, handleChange, handleSubmit } = props;
  const sendToBack = {
    content: newMessage,
    userId: user.id
  };
  console.log('PROPS ', props);
  return (
    <form
      id="new-message-form"
      onSubmit={evt => {
        console.log('message in handlesubmit', newMessage);
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
  console.log('STATE ', state);
  return {
    user: state.user,
    newMessage: state.newMessage
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

export const Chat = connect(mapStateToProps, mapDispatchToProps)(
  NewMessageEntry
);

// class NewMessageEntry extends React.Component {
//   constructor() {
//     super();
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleChange(e) {
//     console.log('VALUE ', e.target.value);
//     this.props.write(e.target.value);
//     console.log('STATE ', this.props.state);
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     const content = this.props.newMessage;
//     console.log('CONTENT ', content);
//     // const channelId = this.props.channelId;

//     this.props.post({ content });
//   }

//   render() {
//     console.log('FROM COMPONENT ', this.props.newMessage);
//     return (
//       <form id="new-message-form" onSubmit={this.handleSubmit}>
//         <div className="input-group input-group-lg">
//           <input
//             className="form-control"
//             type="text"
//             name="content"
//             value={this.props.newMessage}
//             onChange={this.handleChange}
//             placeholder="Say something nice..."
//           />
//           <span className="input-group-btn">
//             <button className="btn btn-default" type="submit">
//               Chat!
//             </button>
//           </span>
//         </div>
//       </form>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     newMessage: state.newMessage
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     write: input => dispatch(writeMessage(input)),
//     post: message => dispatch(postMessage(message))
//   };
// };

// export const Chat = connect(mapStateToProps, mapDispatchToProps)(
//   NewMessageEntry
// );
