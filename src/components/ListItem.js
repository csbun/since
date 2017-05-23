import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Row,
  View,
  Text,
  Subtitle,
  TouchableOpacity,
} from '@shoutem/ui';
import Swipeout from 'react-native-swipeout';
import { selectItem, removeItem } from '../actions/items';
import {
  itemPropTypesShape,
  currentUser as currentUserPropType,
} from '../utils/prop_types';
import { daysSinceByItem, formatDate } from '../utils/calculator';

const styles = {
  row: {
    // paddingTop: 8,
    // paddingBottom: 8,
    padding: 8,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  selectedRow: {
    backgroundColor: '#eee',
  },
  ani: {
    flexDirection: 'row',
  },
  contentLeft: {
    flex: 3,
  },
  contentRight: {
    flex: 1,
    textAlign: 'right',
  },
  del: {
    backgroundColor: 'red',
  },
};


class ListItem extends Component {
  static propTypes = {
    selectItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    openItem: PropTypes.func.isRequired,
    // openedKey: PropTypes.string,
    currentUser: currentUserPropType.isRequired,
    ...itemPropTypesShape,
  }

  // constructor(props, ctx) {
  //   super(props, ctx);
  // }

  // componentWillMount = () => {

  // }

  selectItem = (open) => {
    this.props.selectItem(this.props.uniqueKey);
    this.props.openItem(open ? this.props.uniqueKey : null);
  }

  deleteItem = () => {
    this.props.removeItem(this.props.currentUser.uid, this.props.uniqueKey);
  }

  render() {
    const { selectedKey, uniqueKey, title, date, stopTracking, openItem } = this.props;
    const rowStyle = selectedKey === uniqueKey ? styles.selectedRow : {};
    const swipeoutBtns = [{
      text: 'DELETE',
      // backgroundColor: 'red',
      type: 'delete',
      onPress: this.deleteItem,
    }];
    return (<Swipeout
      right={swipeoutBtns}
      buttonWidth={80}
      autoClose
      onOpen={() => this.selectItem(true)}
      onClose={() => openItem()}
    >
      <TouchableOpacity onPress={() => this.selectItem(false)}>
        <Row style={{ ...styles.row, ...rowStyle }}>
          <View style={styles.contentLeft}>
            <Subtitle>{title}</Subtitle>
            <Text>
              { stopTracking ? 'Ended' : `Since ${formatDate(date)}` }
              { this.itemIsToBeDeleted }
            </Text>
          </View>
          <Text style={styles.contentRight}>
            { daysSinceByItem(this.props) } Days
          </Text>
        </Row>
      </TouchableOpacity>
    </Swipeout>);
  }
}

function mapStateToProps(state) {
  const { selectedKey } = state;
  return { selectedKey };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectItem, removeItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
