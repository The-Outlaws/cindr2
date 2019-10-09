import axios from 'axios';
import socket from '../../socket';
import { GET_MESSAGE, GET_MESSAGES } from './index';

// ACTION CREATORS
export function getMessage(message) {
  const action = { type: GET_MESSAGE, message };
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

export const postMessage = message => {
  return async dispatch => {
    const response = await axios.post('/api/messages', message);
    const newMessage = response.data;
    const action = getMessage(newMessage);
    dispatch(action);
    socket.emit('new-message', newMessage);
  };
};

// REDUCER
export default function message(state = [], action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages;
    case GET_MESSAGE:
      return [...state.messages, action.message];
    default:
      return state;
  }
}
