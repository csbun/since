import React, { Component, PropTypes } from 'react';
import {
  Row,
  View,
  Icon,
  Text,
  Subtitle,
} from '@shoutem/ui';
import { itemTitle, itemDesc, itemDate } from '../utils/prop_types';

const ADAY = 1000 * 60 * 60 * 24;

export default class ListItem extends Component {
  static propTypes = {
    title: itemTitle,
    desc: itemDesc,
    date: itemDate,
  }

  render() {
    const since = Math.floor((Date.now() - this.props.date) / ADAY);
    return (<Row styleName="small">
      <View styleName="vertical">
        <Subtitle>{this.props.title}</Subtitle>
        <Text>{since} Days ago</Text>
        <Text>{this.props.desc}</Text>
      </View>
      <Icon styleName="disclosure" name="right-arrow" />
    </Row>);
  }
}


// <Tile style={styles.li}>
//   <Text style={styles.liText}>{this.props.item.title}</Text>
// </Tile>
