import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DATE_FORMAT, EventItem, useEventItems} from '../context/EventItems';
import {
  Button,
  ButtonGroup,
  Datepicker,
  Input,
  Layout,
  NativeDateService,
} from '@ui-kitten/components';
import Editor from '../components/Editor';

interface EventItemScreenParams {
  id?: string;
  isEdit?: boolean;
}
export const EVENT_ITEM_SCREEN_NAME = 'EventItem';
export type EventItemScreenParamList = {
  [EVENT_ITEM_SCREEN_NAME]: EventItemScreenParams;
};

type Props = NativeStackScreenProps<
  EventItemScreenParamList,
  typeof EVENT_ITEM_SCREEN_NAME
>;

export default function EventItemScreen(props: Props) {
  // console.log(EVENT_ITEM_SCREEN_NAME, props.route);
  const {getById} = useEventItems();
  const eventItem = props.route.params.id
    ? getById(props.route.params.id)
    : undefined;

  if (!eventItem) {
    return <Editor eventItem={eventItem} />;
  }

  return (
    <View>
      <Text>{JSON.stringify(eventItem)}</Text>
    </View>
  );
}
