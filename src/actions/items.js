// https://firebase.googleblog.com/2016/01/the-beginners-guide-to-react-native-and_84.html
import { baasDb } from '../utils/baas';
import {
  LOADING,
  LOADED,
  SELECT_ITEM,
  DONE,
} from '../constants/items';
import { itemPropTypesShape } from '../utils/prop_types';

const itemsRefCache = {};

const itemPropTypes = Object.keys(itemPropTypesShape);
function clearItem(obj) {
  const out = {};
  itemPropTypes.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      out[key] = obj[key];
    }
  });
  return out;
}

export function fetchItems(userId) {
  let itemsRef = itemsRefCache[userId];
  if (itemsRef) {
    return { type: DONE };
  }
  itemsRef = baasDb.ref().child(`items/user-${userId}`);
  itemsRefCache[userId] = itemsRef;
  return (dispatch) => {
    dispatch({ type: LOADING });
    itemsRef.on('value', (snap) => {
      // get children as an array
      const list = [];
      snap.forEach((child) => {
        const val = child.val();
        // wilddog: child.key(); firebase: child.key;
        val.uniqueKey = typeof child.key === 'function' ? child.key() : child.key;
        list.unshift(val);
      });
      dispatch({ type: LOADED, list });
    });
  };
}


export function addItem(userId, item) {
  const itemsRef = itemsRefCache[userId];
  if (itemsRef) {
    itemsRef.push(clearItem(item));
    // TODO: push(value, onComplete) returns firebase.database.ThenableReference
    // https://firebase.google.com/docs/reference/js/firebase.database.Reference#push
  }
  return { type: DONE };
}

export function removeItem(userId, uniqueKey) {
  const itemsRef = itemsRefCache[userId];
  if (itemsRef && uniqueKey) {
    const itemToRemoveRef = itemsRef.child(uniqueKey);
    if (itemToRemoveRef) {
      itemToRemoveRef.remove();
      // TODO: remove(onComplete) returns firebase.Promise containing void
      // https://firebase.google.com/docs/reference/js/firebase.database.Reference#remove
    }
  }
  return { type: DONE };
}

export function updateItem(userId, item) {
  const itemsRef = itemsRefCache[userId];
  const { uniqueKey, ...rest } = clearItem(item);
  if (itemsRef && uniqueKey) {
    const itemToUpdateRef = itemsRef.child(uniqueKey);
    if (itemToUpdateRef) {
      itemToUpdateRef.update(rest);
      // todo: update() returns wilddog.Promise
      // https://docs.wilddog.com/sync/Web/api/Reference.html#update
    }
  }
  return { type: DONE };
}

export function selectItem(uniqueKey) {
  return {
    type: SELECT_ITEM,
    uniqueKey,
  };
}
