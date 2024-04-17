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
  const {getItemById, prependItem, editItem} = useEventItems();

  const eventItem = props.route.params.id
    ? getItemById(props.route.params.id)
    : undefined;

  return (
    <Editor
      eventItem={eventItem}
      onSave={item => {
        if (eventItem?.id) {
          editItem(eventItem.id, item);
        } else {
          prependItem(item);
        }
        navigation.goBack();
      }}
    />
  );
}
