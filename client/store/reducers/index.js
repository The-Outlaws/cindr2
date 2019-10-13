import { combineReducers } from 'redux';
import user from './user';
import messages from './messages';
import newMessage from './newMessage';
import conversations from './conversations';

export const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const GET_MESSAGE = 'GET_MESSAGE';
export const GET_MESSAGES = 'GET_MESSAGES';

export const WRITE_MESSAGE = 'WRITE_MESSAGE';

export const GET_CONVERSATIONS = 'GET_CONVERSATIONS';

const rootReducer = combineReducers({
  user,
  messages,
  newMessage,
  conversations
});

export default rootReducer;
