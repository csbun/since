import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Title,
  Spinner,
} from '@shoutem/ui';
import { Text } from 'react-native';
import { daysFromNow, formatDate } from '../utils/calculator';
import { itemPropType } from '../utils/prop_types';
import { BLUE, WHITE, LIGHT_GREY, FLEX_CENTER } from '../utils/styles';

const styles = {
  banner: Object.assign({
    minHeight: 210,
    backgroundColor: BLUE,
  }, FLEX_CENTER),
  textWhite: {
    color: WHITE,
    textAlign: 'center',
  },
  textGray: {
    color: LIGHT_GREY,
    textAlign: 'center',
  },
  textHuge: {
    fontSize: 80,
  },
};


class Banner extends Component {

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    empty: PropTypes.bool.isRequired,
    ...itemPropType,
  }

  render() {
    const { loading, empty, title, date } = this.props;
    let content;
    if (loading) {
      content = <Spinner />;
    } else if (empty) {
      content = (<Title style={styles.textWhite}>
        Press Add and Enjoy!
      </Title>);
    } else {
      const displayDate = formatDate(date);
      content = (<View>
        <Text style={styles.textGray}>Since {displayDate}</Text>
        <Text style={styles.textWhite}>
          <Text style={styles.textHuge}>{daysFromNow(date)}</Text>
          <Text>&nbsp;D</Text>
        </Text>
        <Title style={styles.textWhite}>{title}</Title>
      </View>);
    }
    return (<View style={styles.banner}>{content}</View>);
  }
}

function mapStateToProps(state) {
  const { items, selectedKey } = state;
  const { list, loading } = items;
  const empty = !list || !list.length;
  let selectedItem = {};
  if (!empty) {
    const selectedItemList = list.filter(i => i.uniqueKey === selectedKey);
    selectedItem = selectedItemList.length ? selectedItemList[0] : list[0];
  }
  return {
    loading,
    empty,
    ...selectedItem,
  };
}

export default connect(mapStateToProps)(Banner);
