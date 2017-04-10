import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Row,
  View,
  Icon,
  Text,
  Subtitle,
  TouchableOpacity,
} from '@shoutem/ui';
import { selectItem } from '../actions/items';
import { itemPropTypesShape } from '../utils/prop_types';
import { daysSinceByItem, formatDate } from '../utils/calculator';

const styles = {
  row: {
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  rowContent: {
    // maxHeight: 56,
  },
};

class ListItem extends Component {
  static propTypes = {
    selectItem: PropTypes.func.isRequired,
    ...itemPropTypesShape,
  }

  static defaultProps = {
    desc: '',
  }

  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem() {
    this.props.selectItem(this.props.uniqueKey);
  }

  render() {
    return (<TouchableOpacity onPress={this.selectItem}>
      <Row style={styles.row}>
        <View style={styles.rowContent}>
          <Subtitle>{this.props.title}</Subtitle>
          <Text>{daysSinceByItem(this.props)} days ({formatDate(this.props.date)})</Text>
        </View>
        <Icon styleName="disclosure" name="right-arrow" />
      </Row>
    </TouchableOpacity>);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectItem }, dispatch);
}

export default connect(null, mapDispatchToProps)(ListItem);
