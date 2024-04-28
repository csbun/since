import {View, Platform} from 'react-native';
import * as Permissions from 'react-native-permissions';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import {
  Button,
  Divider,
  Icon,
  List,
  ListItem,
  Text,
} from '@ui-kitten/components';
import React from 'react';
import {DATE_FORMAT, EventItem} from '../context/EventItems';
import {Keyframe, useKeyframes} from '../context/Keyframes';

function AddToCal(props: AddCalendarEvent.CreateOptions) {
  return (
    <Icon
      style={{width: 24, height: 24}}
      fill="#8F9BB3"
      name="calendar-outline"
      onPress={() => {
        const permission = Platform.select({
          ios: Permissions.PERMISSIONS.IOS.CALENDARS_WRITE_ONLY,
          android: Permissions.PERMISSIONS.ANDROID.WRITE_CALENDAR,
        });
        if (permission) {
          Permissions.request(permission)
            .then(result => {
              if (result !== Permissions.RESULTS.GRANTED) {
                throw new Error(`No permission: ${result}`);
              }
              return AddCalendarEvent.presentEventCreatingDialog(props);
            })
            .then(eventInfo => {
              // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
              // These are two different identifiers on iOS.
              // On Android, where they are both equal and represent the event id, also strings.
              // when { action: 'CANCELED' } is returned, the dialog was dismissed
              console.warn(JSON.stringify(eventInfo));
            })
            .catch((error: string) => {
              // handle error such as when user rejected permissions
              console.warn(error);
            });
        }
      }}
    />
  );
}

function KeyframeItem(props: {eventItem: EventItem; keyframe: Keyframe}) {
  const desc = (() => {
    switch (props.keyframe.diffType) {
      case 'ANNIVERSARY':
        return `${props.keyframe.diff}周年`;
      case 'HUNDREDS_DAYS':
        return `${props.keyframe.diff}00天`;
      case 'COUNTDOWN_DAYS':
        return `倒计时${props.keyframe.diff}天`;
      case 'COUNTDOWN_YEARS':
        return `倒计时${props.keyframe.diff}年`;
    }
  })();
  return (
    <ListItem
      title={props.keyframe.date.format(DATE_FORMAT)}
      description={desc}
      accessoryRight={() => {
        return (
          <AddToCal
            title={`距离 ${props.eventItem.title}(${props.eventItem.date}) ${desc}`}
            startDate={props.keyframe.date.format(
              'YYYY-MM-DDTHH:mm:ss.SSSZ',
            )}></AddToCal>
        );
      }}
    />
  );
}

export function KeyframeList(props: {eventItem: EventItem}) {
  const {keyframes} = useKeyframes(props.eventItem.date);
  return (
    <List
      data={keyframes}
      ItemSeparatorComponent={Divider}
      renderItem={({item}) => {
        return <KeyframeItem eventItem={props.eventItem} keyframe={item} />;
      }}
    />
  );
}
