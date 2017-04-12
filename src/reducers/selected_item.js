import { AsyncStorage } from 'react-native';
import { SELECT_ITEM } from '../constants/items';

// cache last selectedKey in local stroage
const STORAGE_KEY_SELECTED_ITEM = '@AsyncStorage:action:selectedItem';
let lastSelectedItem = '';
AsyncStorage.getItem(STORAGE_KEY_SELECTED_ITEM)
  .then((res) => {
    lastSelectedItem = res || '';
  });

export default function selectedKey(state, action) {
  switch (action.type) {
    case SELECT_ITEM:
      AsyncStorage.setItem(STORAGE_KEY_SELECTED_ITEM, action.uniqueKey);
      return action.uniqueKey;
    default:
      return state || lastSelectedItem;
  }
}
