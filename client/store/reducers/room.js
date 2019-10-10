import axios from 'axios';
import { GET_ROOM } from './index';

//ACTION CREATORS
export function getRoom(rmId) {
  const action = { type: GET_ROOM, rmId };
  return action;
}

//THUNK CREATORS
export const getRoomThunk = userId => {
  return async dispatch => {
    const response = await axios.get(`/api/rooms/${userId}`);
    dispatch(getRoom(response.data));
  };
};

//REDUCER
export default function room(state = [], action) {
  switch (action.type) {
    case GET_ROOM:
      return [...state.action, action];
    default:
      return state;
  }
}

//user id from userroom join table.  if not there, associate user to 1st question
//otherwise use roomid to return questions

//after going to the first room, we associate user to second room(after selected an answer)
