import { BLUE, WHITE, LIGHT_GREY, GREY, BLACK } from './styles';

const styles = {
  // style: {
  //   borderWidth: 1,
  //   borderColor: GREY,
  //   borderRadius: 5,
  //   alignSelf: 'center',
  // },
  barView: {
    backgroundColor: BLUE,
    padding: 10,
  },
  barText: {
    fontWeight: 'bold',
    color: WHITE,
  },
  stageView: {
    padding: 0,
  },
  // Day selector styling
  dayHeaderView: {
    backgroundColor: LIGHT_GREY,
    borderBottomColor: GREY,
  },
  dayHeaderText: {
    fontWeight: 'bold',
    color: BLACK,
  },
  dayRowView: {
    borderColor: LIGHT_GREY,
    height: 40,
  },
  dayText: {
    color: BLACK,
  },
  dayDisabledText: {
    color: GREY,
  },
  dayTodayText: {
    fontWeight: 'bold',
    color: BLUE,
  },
  daySelectedText: {
    fontWeight: 'bold',
    backgroundColor: BLUE,
    color: WHITE,
    borderRadius: 15,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  // Styling month selector.
  monthText: {
    color: BLACK,
    borderColor: BLACK,
  },
  monthDisabledText: {
    color: GREY,
    borderColor: GREY,
  },
  monthSelectedText: {
    fontWeight: 'bold',
    backgroundColor: BLUE,
    color: WHITE,
    overflow: 'hidden',
  },
  // Styling year selector.
  yearMinTintColor: BLUE,
  yearMaxTintColor: GREY,
  yearText: {
    color: BLACK,
  },
};

export default styles;
