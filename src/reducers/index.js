import { combineReducers } from 'redux';
import currentUser from './firebase_user';
import items from './items';

export default combineReducers({
  currentUser,
  items,
});
