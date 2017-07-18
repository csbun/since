// https://github.com/btomashvili/react-redux-firebase-boilerplate/blob/master/src/app/actions/firebase_actions.js
import { AsyncStorage } from 'react-native';
import Baas from '../utils/baas';
import {
  FETCH_USER,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from '../constants/user';

// TODO: 本地缓存的话时间服务器已经丢失登陆状态，会导致获取数据权限失败
const STORAGE_KEY_USER = '@AsyncStorage:action:user';
const STORAGE_TIME_USER = 1000 * 60 * 60 * 24 * 30; // 30 Days
function cacheUser(data) {
  AsyncStorage.setItem(STORAGE_KEY_USER, JSON.stringify({
    expired: Date.now() + STORAGE_TIME_USER,
    data,
  }));
  return data;
}
function removeUserCache(...args) {
  AsyncStorage.removeItem(STORAGE_KEY_USER);
  return args;
}

export function registerUser(user) {
  const request = Baas.registerUser(user);
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(user) {
  const request = Baas.loginUser(user).then(cacheUser);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: Baas.logoutUser().then(removeUserCache),
  };
}

export function fetchUser() {
  // /*
  // TODO: NO user cache
  const request = AsyncStorage.getItem(STORAGE_KEY_USER)
    .then((resString) => {
      const res = JSON.parse(resString);
      if (!res || res.expired < Date.now()) {
        throw new Error('expired');
      }
      return res.data;
    })
    .catch(() => Baas.fetchUser().then(cacheUser));
  /*/
  const request = Baas.fetchUser();
  // */
  return {
    type: FETCH_USER,
    payload: request,
  };
}
