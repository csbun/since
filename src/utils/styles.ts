import {StyleSheet} from 'react-native';

export const BLUE = '#61AFEF';
export const WHITE = '#FFFFFF';
export const GREY = '#BDBDBD';
export const BLACK = '#424242';
export const LIGHT_GREY = '#F5F5F5';

export const STYLE = StyleSheet.create({
  menuIconSize: {
    width: 16,
    height: 16,
  },
  iconSize: {
    width: 24,
    height: 24,
  },
  screen: {
    backgroundColor: WHITE,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWhite: {
    color: WHITE,
  },
  textGray: {
    color: LIGHT_GREY,
  },
  textBlue: {
    color: BLUE,
  },
  textBlob: {
    fontWeight: '700',
  },
});
