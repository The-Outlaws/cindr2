import { WRITE_MESSAGE } from './index';

// ACTION CREATORS
export function writeMessage(content) {
  const action = { type: WRITE_MESSAGE, content };
  return action;
}

// REDUCER
export default function newMessage(state = '', action) {
  switch (action.type) {
    case WRITE_MESSAGE:
      return action.content;

    default:
      return state;
  }
}
