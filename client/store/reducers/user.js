import axios from 'axios';
import history from '../../history';
import { GET_USER, REMOVE_USER, UPDATE_USER } from './index';

/**
 * ACTION CREATORS
 */
export const getUser = user => ({ type: GET_USER, user });
export const removeUser = () => ({ type: REMOVE_USER });
// export const updateUser = user => ({ type: UPDATE_USER}, user);
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (
  method,
  email,
  password,
  firstName,
  age,
  height,
  orientation,
  gender,
  photo,
  avatar
) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstName,
      age,
      height,
      orientation,
      gender,
      photo,
      avatar
    });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push('/game');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

// export const updateUserRooms = (userId, roomId) => async dispatch => {
//   try {
//     const {data} = await axios.update(`/user/updateRoom`)
//     dispatch(updateUser(data))
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
export default function user(state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    // case UPDATE_USER:
    //   return action.user;
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
}
