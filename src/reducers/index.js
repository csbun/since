import { combineReducers } from 'redux';
import currentUser from './user';
import items from './items';
import selectedKey from './selected_item';

export default combineReducers({
  currentUser,
  items,
  selectedKey,
});
