import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEventItems} from '../context/EventItems';
import Editor from '../components/Editor';
import {useNavigation} from '@react-navigation/native';

interface EventItemEditorScreenParams {
  id?: string;
}
export const EVENT_ITEM_EDITOR_SCREEN_NAME = 'EventItemEditor';
export type EventItemEditorScreenParamList = {
  [EVENT_ITEM_EDITOR_SCREEN_NAME]: EventItemEditorScreenParams;
};

type Props = NativeStackScreenProps<
  EventItemEditorScreenParamList,
  typeof EVENT_ITEM_EDITOR_SCREEN_NAME
>;

export default function EventItemEditorScreen(props: Props) {
  const navigation = useNavigation();
  const {getById, prependEventItem, editEventItem} = useEventItems();

  const eventItem = props.route.params.id
    ? getById(props.route.params.id)
    : undefined;

  return (
    <Editor
      eventItem={eventItem}
      onSave={item => {
        if (eventItem?.id) {
          editEventItem(eventItem.id, item);
        } else {
          prependEventItem(item);
        }
        navigation.goBack();
      }}
    />
  );
}
