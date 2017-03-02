import { LOADING, LOADED } from '../constants/items';

export default function items(state, action) {
  switch (action.type) {
    case LOADING:
      return {
        loading: true,
        list: [],
      };
    case LOADED:
      return {
        loading: false,
        list: action.list,
      };
    default:
      return state || { loading: false, list: [] };
  }
}
