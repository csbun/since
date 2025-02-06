import React from 'react';
// import {useColorScheme} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen, {HOME_SCREEN_NAME, HomeScreenParamList} from './src/screens/Home';
import EventItemScreen, {EVENT_ITEM_SCREEN_NAME, EventItemScreenParamList} from './src/screens/EventItem';
import {StorageContextProvider} from './src/context/Storage';
import EventItemEditorScreen, {
  EVENT_ITEM_EDITOR_SCREEN_NAME,
  EventItemEditorScreenParamList,
} from './src/screens/EventItemEditor';
import {BLUE, WHITE} from './src/utils/styles';
import Privacy from './src/components/Privacy';

type ScreenParamList = HomeScreenParamList & EventItemScreenParamList & EventItemEditorScreenParamList;
const Stack = createNativeStackNavigator<ScreenParamList>();

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <StorageContextProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={HOME_SCREEN_NAME}
              component={HomeScreen}
              options={{
                title: '昔时',
              }}
            />
            <Stack.Screen
              name={EVENT_ITEM_SCREEN_NAME}
              component={EventItemScreen}
              options={{
                headerShadowVisible: false,
                headerTintColor: WHITE,
                headerStyle: {
                  backgroundColor: BLUE,
                },
                title: '',
              }}
            />
            <Stack.Screen
              name={EVENT_ITEM_EDITOR_SCREEN_NAME}
              component={EventItemEditorScreen}
              options={{
                title: '编辑',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Privacy />
      </ApplicationProvider>
    </StorageContextProvider>
  );
}

export default App;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ScreenParamList {}
  }
}
