import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useEventItems} from '../context/EventItems';
import {useNavigation} from '@react-navigation/native';
import {Button, List, ListItem, Text} from '@ui-kitten/components';
import {EVENT_ITEM_EDITOR_SCREEN_NAME} from '../screens/EventItemEditor';
import {EVENT_ITEM_SCREEN_NAME} from '../screens/EventItem';

function CreateButton() {
  const navigation = useNavigation();
  return (
    <Button
      onPress={() => {
        navigation.navigate(EVENT_ITEM_EDITOR_SCREEN_NAME, {});
      }}>
      <Text style={styles.createButton}>Create</Text>
    </Button>
  );
}

export default function ListView() {
  const navigation = useNavigation();
  const {eventItems} = useEventItems();

  if (!eventItems || eventItems.length === 0) {
    return (
      <View>
        <CreateButton />
      </View>
    );
  }

  return (
    <View>
      <List
        data={eventItems}
        renderItem={({item}) => (
          <ListItem
            onPress={() => {
              navigation.navigate(EVENT_ITEM_SCREEN_NAME, {id: item.id});
            }}>
            <Text>{item.title}</Text>
          </ListItem>
        )}
      />
      <CreateButton />
    </View>
  );
}

const styles = StyleSheet.create({
  createButton: {
    fontWeight: '700',
  },
});
