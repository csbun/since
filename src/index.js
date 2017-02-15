import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import App from './components/App.js';

const store = createStore(reducer);

export default class AppContainer extends Component {
  render() {
    return <Provider store={store}>
      <App />
    </Provider>;
  }
}
