import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';

import reducer from './reducers';
import App from './components/App';

const store = applyMiddleware(ReduxPromise)(createStore)(reducer);

export default class AppContainer extends Component {
  render() {
    return (<Provider store={store}>
      <App />
    </Provider>);
  }
}
