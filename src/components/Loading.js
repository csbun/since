import React, { Component } from 'react';
import {
  View,
  Icon,
  Text,
} from '@shoutem/ui';

const styles = {
  centerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default class Loading extends Component {
  render() {
    return (<View style={styles.centerStyle}>
      <Icon name="refresh" />
      <Text>Loading</Text>
    </View>);
  }
}
