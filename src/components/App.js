import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { HOME, DETAIL } from '../constants/page';
import Editor from './Editor';
import Home from './Home';

const App = StackNavigator({
  [HOME]: { screen: Home },
  [DETAIL]: { screen: Editor },
}, {
  initialRouteName: HOME,
});

export default App;
