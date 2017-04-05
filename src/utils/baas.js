// https://github.com/btomashvili/react-redux-firebase-boilerplate/blob/master/src/app/utils/firebase.js
/* eslint max-len: 0*/
import firebase from 'firebase';
import wilddog from 'wilddog';

import { CN, WILDDOG_CONFIG, FIREBASE_CONFIG } from '../constants/config';

// Initialize Baas
export const baas = CN ? wilddog : firebase;
export const BaasApp = CN ? wilddog.initializeApp(WILDDOG_CONFIG) : firebase.initializeApp(FIREBASE_CONFIG);
export const baasAuth = BaasApp.auth();
export const baasDb = CN ? BaasApp.sync() : BaasApp.database();

const BaasTools = {

  /**
   * Return an instance of a firebase auth provider based on the provider string.
   *
   * @param provider
   * @returns {firebase.auth.AuthProvider}
   */
  getProvider: (provider) => {
    switch (provider) {
      case 'email':
        return new baas.auth.EmailAuthProvider();
      case 'facebook': // firebase
        return new baas.auth.FacebookAuthProvider();
      case 'github': // firebase
        return new baas.auth.GithubAuthProvider();
      case 'google': // firebase
        return new baas.auth.GoogleAuthProvider();
      case 'twitter': // firebase
        return new baas.auth.TwitterAuthProvider();
      default:
        throw new Error('Provider is not supported!!!');
    }
  },

  /**
   * Login with provider => p is provider "email", "facebook", "github", "google", or "twitter"
   * Uses Popup therefore provider must be an OAuth provider. EmailAuthProvider will throw an error
   *
   * @returns {any|!firebase.Thenable.<*>|firebase.Thenable<any>}
   */
  loginWithProvider: (p) => {
    const provider = BaasTools.getProvider(p);
    return baasAuth.signInWithPopup(provider)
      .then(baasAuth.currentUser)
      .catch(error => ({
        errorCode: error.code,
        errorMessage: error.message,
      }));
  },

  /**
   * Register a user with email and password
   *
   * @param user
   * @returns {any|!firebase.Thenable.<*>|firebase.Thenable<any>}
   */
  registerUser: user => baasAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then(userInfo => userInfo)
    .catch(error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })),

  /**
   * Sign the user out
   *
   * @returns {!firebase.Promise.<*>|firebase.Thenable<any>|firebase.Promise<any>|!firebase.Thenable.<*>}
   */
  logoutUser: () => baasAuth.signOut()
    .then(() => ({
      success: 1,
      message: 'logout',
    })),

  /**
   * Retrieve the current user (Promise)
   * @returns {Promise}
   */
  fetchUser: () => new Promise((resolve, reject) => {
    const unsub = baasAuth.onAuthStateChanged((user) => {
      unsub();
      resolve(user);
    }, (error) => {
      reject(error);
    });
  }),

  /**
   * Log the user in using email and password
   *
   * @param user
   * @returns {any|!firebase.Thenable.<*>|firebase.Thenable<any>}
   */
  loginUser: user => baasAuth.signInWithEmailAndPassword(user.email, user.password)
    .then(userInfo => userInfo)
    .catch(error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })),

  /**
   * Update a user's profile data
   *
   * @param u
   * @returns {!firebase.Promise.<*>|firebase.Thenable<any>|firebase.Promise<any>|!firebase.Thenable.<*>}
   */
  updateUserProfile: u => baasAuth.currentUser.updateProfile(u)
    .then(() => baasAuth.currentUser, error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })),

  /**
   * Reset the password given the specified email
   *
   * @param email {string}
   * @returns {!firebase.Promise.<*>|firebase.Thenable<any>|firebase.Promise<any>|!firebase.Thenable.<*>}
   */
  resetPasswordEmail: email => baasAuth.sendPasswordResetEmail(email)
    .then(() => ({
      message: 'Email sent',
    }), error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })),

  /**
   * Update the user's password with the given password
   *
   * @param newPassword {string}
   * @returns {!firebase.Promise.<*>|firebase.Thenable<any>|firebase.Promise<any>|!firebase.Thenable.<*>}
   */
  changePassword: newPassword => baasAuth.currentUser.updatePassword(newPassword)
    .then(user => user, error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })),

  /**
   * Send an account email verification message for the currently logged in user
   *
   * @returns {!firebase.Promise.<*>|firebase.Thenable<any>|firebase.Promise<any>|!firebase.Thenable.<*>}
   */
  sendEmailVerification: () => baasAuth.currentUser.sendEmailVerification()
    .then(() => ({
      message: 'Email sent',
    }), error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })),

  /**
   * Get the firebase database reference.
   *
   * @param path {!string|string}
   * @returns {!firebase.database.Reference|firebase.database.Reference}
   */
  getDatabaseReference: path => baasDb.ref(path),
};

export default BaasTools;
