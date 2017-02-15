import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

const styles = {
  playground: {
    flex: 1,
  },
};

export default class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     currentSection: 0,
  //   };
  // }
  render() {
    return <View style={styles.playground}>
      <Text>Hello3!!!!!</Text>
    </View>;
  }
}
