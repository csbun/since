import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DATE_FORMAT, EventItem, useEventItems} from '../context/EventItems';
import Editor from '../components/Editor';
import EventItemView from '../components/EventItemView';

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

  return <EventItemView item={eventItem} />;
}
