import React, {useState} from 'react';
// import {useColorScheme} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen, {
  HOME_SCREEN_NAME,
  HomeScreenParamList,
} from './src/screens/Home';
import EventItemScreen, {
  EVENT_ITEM_SCREEN_NAME,
  EventItemScreenParamList,
} from './src/screens/EventItem';
import {EventItem, EventItemsContext} from './src/context/EventItems';

type ScreenParamList = HomeScreenParamList & EventItemScreenParamList;
const Stack = createNativeStackNavigator<ScreenParamList>();

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  const [eventItems, setEventItems] = useState<EventItem[]>([]);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <EventItemsContext.Provider value={{eventItems, setEventItems}}>
          <Stack.Navigator>
            <Stack.Screen
              name={HOME_SCREEN_NAME}
              component={HomeScreen}
              options={
                {
                  // header: () => null,
                }
              }
            />
            <Stack.Screen
              name={EVENT_ITEM_SCREEN_NAME}
              component={EventItemScreen}
            />
          </Stack.Navigator>
        </EventItemsContext.Provider>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

export default App;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ScreenParamList {}
  }
}
