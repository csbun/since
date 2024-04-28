import React from 'react';
import {View} from 'react-native';
import {useEventItems} from '../context/EventItems';
import {useNavigation} from '@react-navigation/native';
import {Button, Divider, List, ListItem, Text} from '@ui-kitten/components';
import {EVENT_ITEM_EDITOR_SCREEN_NAME} from '../screens/EventItemEditor';
import {EVENT_ITEM_SCREEN_NAME} from '../screens/EventItem';
import {daysSinceByItem} from '../utils/calculator';
import {STYLE} from '../utils/styles';

function CreateButton() {
  const navigation = useNavigation();
  return (
    <Button
      onPress={() => {
        navigation.navigate(EVENT_ITEM_EDITOR_SCREEN_NAME, {});
      }}>
      <Text style={STYLE.textBlob}>创建</Text>
    </Button>
  );
}

export default function ListView() {
  const navigation = useNavigation();
  const {eventItems} = useEventItems();

  if (!eventItems || eventItems.length === 0) {
    return (
      <View style={{padding: 10}}>
        <Text
          style={{
            textAlign: 'center',
            margin: 40,
          }}>
          点击下面的按钮，创建一个事件吧！
        </Text>
        <CreateButton />
      </View>
    );
  }

  return (
    <View style={STYLE.screen}>
      <List
        data={eventItems}
        ItemSeparatorComponent={Divider}
        renderItem={({item}) => {
          const ds = daysSinceByItem(item);
          return (
            <ListItem
              accessoryRight={() => (
                <View style={{width: 120}}>
                  <Text>
                    {ds.preText}
                    {ds.diffText}
                    {ds.postText}
                  </Text>
                </View>
              )}
              // accessoryRight={<Icon name="arrow-ios-forward-outline" />}
              title={item.title}
              description={item.date}
              onPress={() => {
                navigation.navigate(EVENT_ITEM_SCREEN_NAME, {id: item.id});
              }}
            />
          );
        }}
      />
      <View style={{padding: 10}}>
        <CreateButton />
      </View>
    </View>
  );
}
