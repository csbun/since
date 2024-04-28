import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EventItem, useEventItems} from '../context/EventItems';
import EventItemView from '../components/EventItemView';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  Icon,
  Menu,
  MenuItem,
  Popover,
  PopoverPlacements,
  useTheme,
} from '@ui-kitten/components';
import {EVENT_ITEM_EDITOR_SCREEN_NAME} from './EventItemEditor';
import {KeyframeList} from '../components/KeyframeList';
import {BLUE, STYLE, WHITE} from '../utils/styles';

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
        eventItem?.id ? <MoreOptions eventItem={eventItem} /> : null,
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
    <View style={STYLE.screen}>
      <EventItemView item={eventItem} />
      <KeyframeList eventItem={eventItem} />
    </View>
  );
}

function MoreOptions(props: {eventItem: EventItem}) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const {removeItem} = useEventItems();

  return (
    <Popover
      anchor={() => {
        return (
          <Icon
            name="more-horizontal-outline"
            style={STYLE.iconSize}
            fill={WHITE}
            onPress={() => setVisible(true)}
          />
        );
      }}
      visible={visible}
      placement={PopoverPlacements.BOTTOM_END}
      onBackdropPress={() => setVisible(false)}>
      <Menu style={{width: 70}}>
        <MenuItem
          title={
            <>
              <Icon
                name="edit-2-outline"
                style={STYLE.menuIconSize}
                fill={theme['text-basic-color']}
              />
              <Text>编辑</Text>
            </>
          }
          onPress={() => {
            setVisible(false);
            navigation.navigate(EVENT_ITEM_EDITOR_SCREEN_NAME, {
              id: props.eventItem.id,
            });
          }}
        />
        <MenuItem
          title={
            <>
              <Icon
                name="trash-2-outline"
                style={STYLE.menuIconSize}
                fill={theme['text-danger-color']}
              />
              <Text status="danger">删除</Text>
            </>
          }
          onPress={() => {
            setVisible(false);
            // 暂时不做二次确认了
            removeItem(props.eventItem.id);
            navigation.goBack();
          }}
        />
      </Menu>
    </Popover>
  );
}
