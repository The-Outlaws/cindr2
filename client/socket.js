import io from 'socket.io-client';
import store from './store';
import { getMessage, getMessages } from './store/reducers/messages';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');

  socket.on('priorMessages', messages => {
    store.dispatch(getMessages(messages));
  });
  socket.on('incomingMessage', message => {
    store.dispatch(getMessage(message));
  });
  // socket.on('new-message', message => {
  //   store.dispatch(getMessage(message));
  // });
});

export default socket;
