import axios from 'axios';
import socket from '../../socket';
import { GET_CONVERSATIONS } from './index';

// ACTION CREATORS

export function gotConversations(payload) {
  const action = { type: GET_CONVERSATIONS, payload };
  return action;
}

// THUNK CREATORS
export const getConversations = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/conversations');
      dispatch(gotConversations(data));
    } catch (err) {
      console.error(err);
    }
  };
};

// REDUCER
export default function conversations(state = [], action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.payload;
    default:
      return state;
  }
}
