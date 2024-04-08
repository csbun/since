import React from 'react';
import ListView from '../components/ListView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface HomeScreenParams {}
export const HOME_SCREEN_NAME = 'Home';
export type HomeScreenParamList = {
  [HOME_SCREEN_NAME]: HomeScreenParams;
};

type Props = NativeStackScreenProps<
  HomeScreenParamList,
  typeof HOME_SCREEN_NAME
>;

export default function HomeScreen(props: Props) {
  console.log(HOME_SCREEN_NAME, props);
  return <ListView />;
}
