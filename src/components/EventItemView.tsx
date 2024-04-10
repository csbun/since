import React from 'react';
import {daysSinceByItem, formatDate} from '../utils/calculator';
import {EventItem, useEventItems} from '../context/EventItems';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {BLUE, WHITE, LIGHT_GREY, FLEX_CENTER} from '../utils/styles';

interface Props {
  item: EventItem;
}

export default function EventItemView(props: Props) {
  const {item} = props;
  return (
    <View style={styles.bannerContent}>
      <Text style={styles.textWhite}>{item.title}</Text>
      <Text style={styles.textWhite}>
        <Text style={styles.textHuge}>{daysSinceByItem(item)}</Text>
        <Text>&nbsp;D</Text>
      </Text>
      <Text style={styles.textGray}>Since {formatDate(item.date)}</Text>
      <Text>{JSON.stringify(item)}</Text>
      {/* <TouchableOpacity
        style={styles.editBtn}
        onPress={() => {
          this.props.goEdit(this.props);
        }}>
        <Icon style={styles.textWhite} name="edit" />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = {
  banner: {
    minHeight: 250,
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
