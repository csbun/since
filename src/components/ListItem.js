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

const STYLE_ROW = {
  paddingTop: 8,
  paddingBottom: 8,
  borderBottomWidth: 1,
  borderColor: '#ddd',
};

const styles = {
  row: STYLE_ROW,
  selectedRow: Object.assign({
    backgroundColor: '#eee',
  }, STYLE_ROW),
};

class ListItem extends Component {
  static propTypes = {
    selectItem: PropTypes.func.isRequired,
    ...itemPropTypesShape,
  }

  static defaultProps = {
    desc: '',
  }

  selectItem = () => {
    this.props.selectItem(this.props.uniqueKey);
  }

  render() {
    const { selectedKey, uniqueKey, title, date, stopTracking, endDate } = this.props;
    const style = selectedKey === uniqueKey ? styles.selectedRow : styles.row;
    return (<TouchableOpacity onPress={this.selectItem}>
      <Row style={style}>
        <View style={styles.rowContent}>
          <Subtitle>{title}</Subtitle>
          <Text>
            {daysSinceByItem(this.props)} days
            ( {formatDate(date)}
            { stopTracking ? ` ⇨ ${formatDate(endDate)}` : '' } )
          </Text>
        </View>
        <Icon styleName="disclosure" name="right-arrow" />
      </Row>
    </TouchableOpacity>);
  }
}

function mapStateToProps(state) {
  const { selectedKey } = state;
  return { selectedKey };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
