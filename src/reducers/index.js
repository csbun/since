import { combineReducers } from 'redux';
import currentUser from './user';
import items from './items';

export default combineReducers({
  currentUser,
  items,
});
