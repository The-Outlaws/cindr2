import axios from 'axios';
import { GOT_ACTIVE_USERS } from './index';

const initialState = [];

//ACTION CREATORS
export const gotActiveUsers = destinationRoom => ({
  type: GOT_ACTIVE_USERS,
  destinationRoom
});
// //THUNK CREATORS
export const getActiveUsers = roomId => {
  return async dispatch => {
    try {
      console.log(roomId);
      const res = await axios.get(`/api/rooms/${roomId}`);
      console.log('in get active users', res);
      dispatch(gotActiveUsers(res.data[0].users));
    } catch (err) {
      console.error(err);
    }
  };
};
//REDUCER
export default function room(state = initialState, action) {
  switch (action.type) {
    case GOT_ACTIVE_USERS:
      // state = action.room;
      return action.destinationRoom;
    default:
      return state;
  }
}
