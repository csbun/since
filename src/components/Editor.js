import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import Calendar from 'react-native-calendar'

const styles = {
  playground: {
    flex: 1,
  },
};


const customDayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const customMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
  'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


export default class Editor extends Component {
  static navigationOptions = {
    title: 'Item',
    // // Or the title string may be a function of the navigation prop:
    // title: ({ state }) => `Chat with ${state.params.user}`
    header({ goBack }) {
      return {
        right: <Button
          title="Done"
          onPress={() => goBack()}
        />,
      }
    },
  }

  constructor() {
    super();
    this.state = {
      text: '',
      desc: '',
    };
  }
  render() {
    return <View style={styles.playground}>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => this.setState({ text })}
        value={this.state.text}
      />
      <TextInput
        style={{height: 80, borderColor: 'gray', borderWidth: 1}}
        multiline={true}
        numberOfLines={2}
        onChangeText={desc => this.setState({ desc })}
        value={this.state.desc}
      />
      <Calendar
        ref="calendar"
        eventDates={['2017-02-10']}
        events={[{date: '2017-02-14', hasEventCircle: {backgroundColor: 'powderblue'}}]}
        scrollEnabled
        showControls
        dayHeadings={customDayHeadings}
        monthNames={customMonthNames}
        titleFormat={'MMMM YYYY'}
        prevButtonText={'Prev'}
        nextButtonText={'Next'}
        onDateSelect={(date) => this.setState({ selectedDate: date })}
        onTouchPrev={(e) => console.log('onTouchPrev: ', e)}
        onTouchNext={(e) => console.log('onTouchNext: ', e)}
        onSwipePrev={(e) => console.log('onSwipePrev: ', e)}
        onSwipeNext={(e) => console.log('onSwipeNext', e)}
      />
      <Button
        onPress={this.onSave.bind(this)}
        title="SAVE"
        color="#841584"
        accessibilityLabel="Press to save"
      />
    </View>;
  }

  onSave() {
    console.log(this.state);
  }
}
