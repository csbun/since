import React, { Component } from 'react';
import {
  View,
  Spinner,
} from '@shoutem/ui';

export const styles = {
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
      <Spinner />
    </View>);
  }
}
