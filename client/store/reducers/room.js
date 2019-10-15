import axios from 'axios';
//import { GET_ROOMS, ADD_FIRST_ROOM } from './index';
import { GET_ACTIVE_ROOM } from './index';

const initialState = {
  allRooms: [],
  activeRoom: {}
};

//ACTION CREATORS

export const getActiveRoom = room => ({
  type: GET_ACTIVE_ROOM,
  room
});

// export function getRooms(room) {
//   const action = { type: GET_ROOMS, room };
//   return action;
// }

// export const addRoom = (room) => ({
//   type: ADD_FIRST_ROOM,
//   room
// })

// //THUNK CREATORS

export const gotActiveRoom = userId => {
  return async dispatch => {
    try {
      const res = axios.get(`/api/rooms/active/${userId}`);
      console.log('active room data', res.data);
      dispatch(getActiveRoom(res.data));
    } catch (err) {
      next(err);
    }
  };
};

// export const getRoomsThunk = userId => {
//   return async dispatch => {
//     console.log('FLAG ONE')
//     const response = await axios.get(`/api/rooms/${userId}`);
//     console.log('IN GET ROOMS THUNK', response.data)

//     dispatch(getRooms(response.data));
//   };
// };

// export const addRoomThunk = (userId, roomId) => {
//   return async dispatch => {
//     console.log('FLAG TWO')
//     const res = await axios.post(`/api/rooms/${userId}`, roomId)
//     dispatch(addRoom(res.data))
//   }
// }

//REDUCER
export default function room(state = initialState, action) {
  switch (action.type) {
    // case GET_ROOMS:
    //   state = action.rooms
    //   return state;
    // case ADD_FIRST_ROOM:
    //   return [...state, action.room]
    case GET_ACTIVE_ROOM:
      state.activeRoom = action.room;
      return state;
    default:
      return state;
  }
}

//user id from userroom join table.  if not there, associate user to 1st question
//otherwise use roomid to return questions

//after going to the first room, we associate user to second room(after selected an answer)
