import axios from 'axios';
// import socket from '../../socket';
import { GET_CONVERSATIONS, ACCEPT_REQUEST, REJECT_REQUEST } from './index';

// ACTION CREATORS

export function gotConversations(payload) {
  const action = { type: GET_CONVERSATIONS, payload };
  return action;
}
export function acceptedConversation(convo) {
  const action = { type: ACCEPT_REQUEST, convo };
  return action;
}
export function rejectedConversation(convo) {
  const action = { type: REJECT_REQUEST, convo };
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

export const acceptConversation = convoInfo => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/conversations/accept', convoInfo);
      dispatch(acceptedConversation(data));
    } catch (err) {
      console.error(err);
    }
  };
};
export const rejectConversation = convoInfo => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/conversations/reject', convoInfo);
      dispatch(rejectedConversation(data));
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
    case ACCEPT_REQUEST:
      const filteredState = state.filter(convo => convo.id !== action.convo.id);
      return [...filteredState, action.convo];
    case REJECT_REQUEST:
      const newState = state.filter(convo => convo.id !== action.convo.id);
      return [...newState, action.convo];
    default:
      return state;
  }
}
