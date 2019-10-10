import io from 'socket.io-client';
import store from './store';
import { getMessage } from './store/reducers/messages';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');

  socket.on('new-message', message => {
    store.dispatch(getMessage(message));
  });
});

export default socket;
