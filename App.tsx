import React, {useEffect, useState} from 'react';
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
import {StorageContext} from './src/context/Storage';
import EventItemEditorScreen, {
  EVENT_ITEM_EDITOR_SCREEN_NAME,
  EventItemEditorScreenParamList,
} from './src/screens/EventItemEditor';

type ScreenParamList = HomeScreenParamList &
  EventItemScreenParamList &
  EventItemEditorScreenParamList;
const Stack = createNativeStackNavigator<ScreenParamList>();

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  const [store, setStore] = useState<Record<string, any>>({});

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <StorageContext.Provider value={{store, setStore}}>
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
            <Stack.Screen
              name={EVENT_ITEM_EDITOR_SCREEN_NAME}
              component={EventItemEditorScreen}
            />
          </Stack.Navigator>
        </StorageContext.Provider>
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
