import { SELECT_ITEM } from '../constants/items';
// TODO: cache last selectedKey in local stroage

export default function selectedKey(state = '', action) {
  switch (action.type) {
    case SELECT_ITEM:
      return action.uniqueKey;
    default:
      return state;
  }
}
