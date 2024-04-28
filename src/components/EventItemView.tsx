import React from 'react';
import {daysSinceByItem, formatDate} from '../utils/calculator';
import {EventItem} from '../context/EventItems';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {BLUE, WHITE, LIGHT_GREY, STYLE} from '../utils/styles';

interface Props {
  item: EventItem;
}

export default function EventItemView(props: Props) {
  const {item} = props;
  const ds = daysSinceByItem(item);
  return (
    <View style={[STYLE.flexCenter, styles.bannerContent]}>
      <Text style={[STYLE.textWhite, STYLE.textBlob, styles.textTitle]}>
        {item.title}
      </Text>
      <Text style={[STYLE.textGray, styles.textMedium]}>
        {formatDate(item.date)}
      </Text>
      <Text>
        <Text style={[STYLE.textWhite]}>{ds.preText}</Text>
        <Text style={[STYLE.textWhite, styles.textHuge]}>{ds.diffText}</Text>
        <Text style={[STYLE.textWhite]}>{ds.postText}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContent: {
    backgroundColor: BLUE,
    padding: 20,
  },
  textTitle: {
    fontSize: 20,
  },
  textMedium: {
    fontSize: 30,
  },
  textHuge: {
    fontSize: 80,
  },
  floatText: {
    width: 0,
    overflow: 'visible',
  },
});
