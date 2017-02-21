import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const styles = {};

export default class ListItem extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
  }

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
