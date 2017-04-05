// https://github.com/btomashvili/react-redux-firebase-boilerplate/blob/master/src/app/reducers/firebase_user_reducer.js
import {
  REGISTER_USER,
  LOGIN_USER,
  FETCH_USER,
  LOGOUT_USER,
} from '../constants/user';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || {};
    case LOGOUT_USER:
    case REGISTER_USER:
    case LOGIN_USER:
      return action.payload;
    default:
      return state;
  }
}
