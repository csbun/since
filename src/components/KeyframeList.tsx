import {View} from 'react-native';
import {DATE_FORMAT, EventItem} from '../context/EventItems';
import {Text} from '@ui-kitten/components';
import React from 'react';
import {Keyframe, useKeyframes} from '../context/Keyframes';

function KeyframeItem(props: Keyframe) {
  return (
    <View>
      <Text>{props.date.format(DATE_FORMAT)}</Text>
      <Text>
        {props.diff}:{props.diffType}
      </Text>
    </View>
  );
}

export function KeyframeList(props: {eventItem: EventItem}) {
  const {keyframes} = useKeyframes(props.eventItem.date);
  return (
    <View>
      {keyframes.map(keyframe => (
        <KeyframeItem key={keyframe.id} {...keyframe} />
      ))}
    </View>
  );
}
