import axios from 'axios';
import socket from '../../socket';
import { GET_MESSAGE, GET_MESSAGES } from './index';

// ACTION CREATORS
export function getMessage(newMessage) {
  const action = { type: GET_MESSAGE, newMessage };
  return action;
}

export function getMessages(messages) {
  const action = { type: GET_MESSAGES, messages };
  return action;
}

// THUNK CREATORS
export const fetchMessages = () => {
  return async dispatch => {
    const response = await axios.get('/api/messages');
    const messages = response.data;
    const action = getMessages(messages);
    dispatch(action);
  };
};

export const postMessage = messageCont => {
  return async dispatch => {
    console.log('MESSAGE CONT ', messageCont);
    const response = await axios.post('/api/messages', messageCont);
    console.log('RESPONSE ', response);
    const messageData = response.data;
    console.log('NEWMESSAGE ', response.data);
    dispatch(getMessage(messageData));
    socket.emit('new-message', messageData);
  };
};

// REDUCER
export default function message(state = [], action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages;
    case GET_MESSAGE:
      return [state.newMessage, action.newMessage];
    default:
      return state;
  }
}
