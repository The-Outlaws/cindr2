import { combineReducers } from 'redux';
import user from './user';
import message from './messages';
import newMessage from './newMessage';

export const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const GET_MESSAGE = 'GET_MESSAGE';
export const GET_MESSAGES = 'GET_MESSAGES';

export const WRITE_MESSAGE = 'WRITE_MESSAGE';

const rootReducer = combineReducers({
  user,
  message,
  newMessage
});

export default rootReducer;
