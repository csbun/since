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
  contentLeft: {
    flex: 3,
  },
  contentRight: {
    flex: 1,
    textAlign: 'right',
  },
};

class ListItem extends Component {
  static propTypes = {
    selectItem: PropTypes.func.isRequired,
    ...itemPropTypesShape,
  }

  selectItem = () => {
    this.props.selectItem(this.props.uniqueKey);
  }

  render() {
    const { selectedKey, uniqueKey, title, date, stopTracking } = this.props;
    const style = selectedKey === uniqueKey ? styles.selectedRow : styles.row;
    return (<TouchableOpacity onPress={this.selectItem}>
      <Row style={style}>
        <View style={styles.contentLeft}>
          <Subtitle>{title}</Subtitle>
          <Text>
            { stopTracking ? 'Ended' : `Since ${formatDate(date)}` }
          </Text>
        </View>
        <Text style={styles.contentRight}>
          { daysSinceByItem(this.props) } Days
        </Text>
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
