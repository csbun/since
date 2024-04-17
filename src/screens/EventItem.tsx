import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEventItems} from '../context/EventItems';
import EventItemView from '../components/EventItemView';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@ui-kitten/components';
import {EVENT_ITEM_EDITOR_SCREEN_NAME} from './EventItemEditor';
import {KeyframeList} from '../components/KeyframeList';

interface EventItemScreenParams {
  id?: string;
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
  const navigation = useNavigation();
  const {getItemById} = useEventItems();
  const eventItem = props.route.params.id
    ? getItemById(props.route.params.id)
    : undefined;

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () =>
        eventItem?.id ? (
          <Button
            appearance="ghost"
            onPress={() =>
              navigation.navigate(EVENT_ITEM_EDITOR_SCREEN_NAME, {
                id: eventItem.id,
              })
            }>
            Edit
          </Button>
        ) : null,
    });
  }, [navigation, eventItem?.id]);

  if (!eventItem) {
    return (
      <View>
        <Text>No item</Text>
      </View>
    );
  }

  return (
    <View>
      <EventItemView item={eventItem} />
      <KeyframeList eventItem={eventItem} />
    </View>
  );
}
