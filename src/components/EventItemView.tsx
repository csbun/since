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
    </View>
  );
}

const styles = {
  bannerContent: {}, //FLEX_CENTER,
  textWhite: {
    color: WHITE,
    // textAlign: 'center',
  },
  textGray: {
    color: LIGHT_GREY,
    // textAlign: 'center',
  },
  textHuge: {
    fontSize: 80,
  },
};
