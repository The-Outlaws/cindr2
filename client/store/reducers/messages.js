import axios from 'axios';
import socket from '../../socket';
import { GET_MESSAGE, GET_MESSAGES } from './index';

// ACTION CREATORS
export function getMessage(newMessage) {
  const action = { type: GET_MESSAGE, newMessage };
  return action;
}

export function getMessages(payload) {
  const action = { type: GET_MESSAGES, payload };
  return action;
}

// THUNK CREATORS
// export const fetchMessages = () => {
//   return async dispatch => {
//     try {
//       const { data } = await axios.get('/api/messages');
//       dispatch(getMessages(data));
//     } catch (err) {
//       console.error(err);
//     }
//   };
// };

export const postMessage = messageCont => {
  return async dispatch => {
    const response = await axios.post('/api/messages', messageCont);
    const messageData = response.data;
    dispatch(getMessage(messageData));
    socket.emit('new-message', messageData);
  };
};

// REDUCER
export default function messages(state = [], action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.payload;
    case GET_MESSAGE:
      return [...state, action.newMessage];
    default:
      return state;
  }
}
