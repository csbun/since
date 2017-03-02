// https://firebase.googleblog.com/2016/01/the-beginners-guide-to-react-native-and_84.html
import { firebaseDb } from '../utils/firebase';
import {
  LOADING,
  LOADED,
  DONE,
} from '../constants/items';

const itemsRefCache = {};

export function fetchItems(userId) {
  let itemsRef = itemsRefCache[userId];
  if (itemsRef) {
    return { type: DONE };
  }
  itemsRef = firebaseDb.ref().child(`items/user-${userId}`);
  itemsRefCache[userId] = itemsRef;
  return (dispatch) => {
    dispatch({ type: LOADING });
    itemsRef.on('value', (snap) => {
      // get children as an array
      const list = [];
      snap.forEach((child) => {
        const val = child.val();
        val.uniqueKey = child.key;
        list.unshift(val);
      });
      dispatch({ type: LOADED, list });
    });
  };
}


export function addItem(userId, item) {
  const itemsRef = itemsRefCache[userId];
  if (itemsRef) {
    itemsRef.push(item);
  }
  return { type: DONE };
}
