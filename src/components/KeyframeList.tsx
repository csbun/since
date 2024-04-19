import {View, Platform} from 'react-native';
import * as Permissions from 'react-native-permissions';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import {Button, Icon, Text} from '@ui-kitten/components';
import React from 'react';
import {DATE_FORMAT, EventItem} from '../context/EventItems';
import {Keyframe, useKeyframes} from '../context/Keyframes';

function KeyframeItem(props: Keyframe) {
  return (
    <View>
      <Text>{props.date.format(DATE_FORMAT)}</Text>
      <Text>
        {props.diff}:{props.diffType}
      </Text>
      <Button
        // name="star"
        // fill="#8F9BB3"
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
                return AddCalendarEvent.presentEventCreatingDialog({
                  title: 'TODO: title',
                  startDate: props.date.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                });
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
        }}>
        hello
      </Button>
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
