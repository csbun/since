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
import { daysFromNow, formatDate } from '../utils/calculator';

const styles = {
  row: {
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  rowContent: {
    maxHeight: 56,
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
    const since = daysFromNow(this.props.date);
    const date = formatDate(this.props.date);
    const descDisplay = this.props.desc ? <Text>{this.props.desc}</Text> : null;
    return (<TouchableOpacity onPress={this.selectItem}>
      <Row style={styles.row}>
        <View style={styles.rowContent}>
          <Subtitle>{this.props.title}</Subtitle>
          <Text>{since} Days ago. (since {date})</Text>
          {descDisplay}
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
