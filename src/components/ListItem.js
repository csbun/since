import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PanResponder, Animated } from 'react-native';
import {
  Row,
  View,
  Text,
  Subtitle,
  TouchableOpacity,
} from '@shoutem/ui';
import { selectItem } from '../actions/items';
import { itemPropTypesShape } from '../utils/prop_types';
import { daysSinceByItem, formatDate } from '../utils/calculator';

const DELETED_TRANSLATE_X = 100;
const MIN_TRANSLATE_X = 10;

const styles = {
  row: {
    paddingTop: 8,
    paddingBottom: 8,
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
};

class ListItem extends Component {
  static propTypes = {
    selectItem: PropTypes.func.isRequired,
    ...itemPropTypesShape,
  }

  constructor(props, ctx) {
    super(props, ctx);
    // https://facebook.github.io/react-native/docs/panresponder.html
    this.itemTouchResponder = PanResponder.create({
      // 申请成为手势 start 事件响应者
      onStartShouldSetPanResponder: () => true,
      // 申请成为手势 move 事件响应者，只要有 start 就够了，反而单独一个 move 是无效的
      // onMoveShouldSetPanResponder: () => true,
      // onPanResponderGrant: this._handlePanResponderGrant,
      // 响应 move 事件
      onPanResponderMove: this.touchMoveItem,
      // 响应触摸事件结束
      onPanResponderRelease: this.touchReleaseItem,
      onPanResponderTerminate: this.touchReleaseItem,
    });
    this.itemPositionX = new Animated.Value(0);
    this.itemIsToBeDeleted = false;
  }

  componentWillMount = () => {

  }

  touchMoveItem = (evt, gestureState) => {
    // https://facebook.github.io/react-native/docs/animations.html
    const { dx } = gestureState;
    if (dx < MIN_TRANSLATE_X && dx > -MIN_TRANSLATE_X) {
      return;
    }
    this.selectItem();
    let toValue = 0;
    if (this.itemIsToBeDeleted && dx > 0) {
      // move right
      toValue = dx - DELETED_TRANSLATE_X;
    } else if (!this.itemIsToBeDeleted && dx < 0) {
      // move left
      toValue = dx;
    }
    if (toValue > 0) {
      toValue = 0;
    }
    if (toValue < -DELETED_TRANSLATE_X) {
      toValue = -DELETED_TRANSLATE_X;
    }
    Animated.spring(this.itemPositionX, { toValue }).start();
  }

  touchReleaseItem = (evt, gestureState) => {
    const { dy } = gestureState;
    if (dy === 0) {
      this.selectItem();
    }
    console.log('release');
    let toValue = 0;
    if (gestureState.dx <= -DELETED_TRANSLATE_X) {
      // move to max left
      this.itemIsToBeDeleted = true;
      toValue = -DELETED_TRANSLATE_X;
    } else {
      // move back to default
      this.itemIsToBeDeleted = false;
    }
    Animated.spring(this.itemPositionX, { toValue }).start();
  }

  selectItem = () => {
    this.props.selectItem(this.props.uniqueKey);
  }

  render() {
    const { selectedKey, uniqueKey, title, date, stopTracking } = this.props;
    const rowStyle = selectedKey === uniqueKey ? styles.selectedRow : {};
    return (<Row style={{ ...styles.row, ...rowStyle }} {...this.itemTouchResponder.panHandlers}>
      <Animated.View style={{ ...styles.ani, transform: [{ translateX: this.itemPositionX }] }}>
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
      </Animated.View>
      <TouchableOpacity>
        <Text>DEL</Text>
      </TouchableOpacity>
    </Row>);
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
