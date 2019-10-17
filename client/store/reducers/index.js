import { combineReducers } from 'redux';
import user from './user';
import room from './room';
import messages from './messages';
import newMessage from './newMessage';
import conversations from './conversations';

export const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const GOT_ACTIVE_USERS = 'GOT_ACTIVE_USERS';
export const GET_ACTIVE_ROOM = 'GET_ACTIVE_ROOM';
//export const GET_ALL_ROOMS = 'GET_ALL_ROOMS';
//export const ADD_FIRST_ROOM = 'ADD_FIRST_ROOM'

export const GET_MESSAGE = 'GET_MESSAGE';
export const GET_MESSAGES = 'GET_MESSAGES';

export const WRITE_MESSAGE = 'WRITE_MESSAGE';

export const GET_CONVERSATIONS = 'GET_CONVERSATIONS';
export const ACCEPT_REQUEST = 'ACCEPT_REQUEST';
export const REJECT_REQUEST = 'REJECT_REQUEST';
export const REQUEST_CONVERSATION = 'REQUEST_CONVERSATION';

const rootReducer = combineReducers({
  user,
  room,
  messages,
  newMessage,
  conversations
});

export default rootReducer;
