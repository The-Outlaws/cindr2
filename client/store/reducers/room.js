import axios from 'axios';
import { GOT_ACTIVE_USERS } from './index';

const initialState = [];

//ACTION CREATORS

export const gotActiveUsers = room => ({
  type: GOT_ACTIVE_USERS,
  room
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
      next(err);
    }
  };
};

// }

//REDUCER
export default function room(state = initialState, action) {
  switch (action.type) {
    case GOT_ACTIVE_USERS:
      state = action.room;
      return state;
    default:
      return state;
  }
}

//user id from userroom join table.  if not there, associate user to 1st question
//otherwise use roomid to return questions

//after going to the first room, we associate user to second room(after selected an answer)
