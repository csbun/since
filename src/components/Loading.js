import React, { Component } from 'react';
import { View, Spinner } from '@shoutem/ui';
import { FLEX_CENTER } from '../utils/styles';

export default class Loading extends Component {
  render() {
    return (<View style={FLEX_CENTER}>
      <Spinner />
    </View>);
  }
}
