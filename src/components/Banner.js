// https://unsplash.it/
// https://facebook.github.io/react-native/docs/image.html
// http://stackoverflow.com/questions/29322973/whats-the-best-way-to-add-a-full-screen-background-image-in-react-native
// https://www.npmjs.com/package/get-image-colors
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Title,
  Spinner,
  Icon,
  TouchableOpacity,
} from '@shoutem/ui';
import { Text } from 'react-native';
import { daysSinceByItem, formatDate } from '../utils/calculator';
import { itemPropType } from '../utils/prop_types';
import { BLUE, WHITE, LIGHT_GREY, FLEX_CENTER } from '../utils/styles';

const styles = {
  banner: {
    minHeight: 210,
    backgroundColor: BLUE,
  },
  bannerContent: FLEX_CENTER,
  editBtn: {
    // position: 'absolute',
    position: 'absolute',
    right: 20,
    top: 20,
  },
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
    goEdit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    empty: PropTypes.bool.isRequired,
    ...itemPropType,
  }

  // constructor(prop) {
  //   super(prop);
  //   this.goEdit = this.goEdit.bind(this);
  // }

  // goEdit() {
  //   if (this.props.uniqueKey) {
  //     const { navigate } = this.props.navigation;
  //     navigate(EDITOR, this.props);
  //   }
  // }

  render() {
    const { loading, empty, title, date, stopTracking, endDate } = this.props;
    let content;
    if (loading) {
      content = <Spinner style={styles.bannerContent} />;
    } else if (empty) {
      content = (<View style={styles.bannerContent}>
        <Title style={styles.textWhite}>
          Press Add and Enjoy!
        </Title>
      </View>);
    } else {
      content = (<View style={styles.bannerContent}>
        <Title style={styles.textWhite}>{title}</Title>
        <Text style={styles.textWhite}>
          <Text style={styles.textHuge}>{daysSinceByItem(this.props)}</Text>
          <Text>&nbsp;D</Text>
        </Text>
        <Text style={styles.textGray}>Since {formatDate(date)}</Text>
        { stopTracking ? <Text style={styles.textGray}>Till {formatDate(endDate)}</Text> : null }
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => { this.props.goEdit(this.props); }}
        >
          <Icon style={styles.textWhite} name="edit" />
        </TouchableOpacity>
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
