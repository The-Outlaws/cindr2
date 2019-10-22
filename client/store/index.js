import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { getMessages, getMessage } from './reducers/messages';
// import {getActiveUsers} from './reducers/room'
import socket from '../socket';

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(rootReducer, middleware);

socket.on('priorMessages', messages => {
  store.dispatch(getMessages(messages));
});
socket.on('new-message', message => {
  store.dispatch(getMessage(message));
});
export const openChat = users => {
  socket.emit('chat', users);
};
export const sendMessage = (text, sender, receiver) => {
  socket.emit('message', { text, sender, receiver });
};

export default store;
export * from './reducers/user';
export * from './reducers/messages';
export * from './reducers/conversations';
export * from './reducers/room';
