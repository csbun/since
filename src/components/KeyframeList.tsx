import {View} from 'react-native';
import {DATE_FORMAT, EventItem} from '../context/EventItems';
import {Text} from '@ui-kitten/components';
import React from 'react';
import {useKeyframes} from '../context/Keyframes';
import {Dayjs} from 'dayjs';

function KeyframeItem(props: {date: Dayjs}) {
  return <Text>{props.date.format(DATE_FORMAT)}</Text>;
}

export function KeyframeList(props: {eventItem: EventItem}) {
  const {keyframes} = useKeyframes(props.eventItem.id, props.eventItem.date);
  return (
    <View>
      {keyframes.map(keyframe => (
        <KeyframeItem key={keyframe.id} date={keyframe.date} />
      ))}
    </View>
  );
}
