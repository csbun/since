import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Calendar from 'react-native-calendar-datepicker';
import {
  View,
  TextInput,
  TouchableOpacity,
} from '@shoutem/ui';
import calendarStyles from '../utils/calendar_styles';
import { toMidnightTimeStamp } from '../utils/calculator';


const styles = {
  calendar: {
    backgroundColor: '#fff',
  },
};


export default class DatePicker extends Component {
  static propTypes = {
    style: PropTypes.object,
    defaultDate: PropTypes.number,
    showCalendar: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    style: {},
    showCalendar: false,
    defaultDate: undefined,
  }

  constructor(props) {
    super(props);
    this.state = {
      showCalendar: props.showCalendar,
      date: props.defaultDate ? new Date(props.defaultDate) : new Date(),
    };
  }

  onChange = (date) => {
    this.setState({ date });
    this.props.onChange(toMidnightTimeStamp(date));
    this.toggleCalendar();
  }

  toggleCalendar = () => {
    this.setState({
      showCalendar: !this.state.showCalendar,
    });
  }

  render() {
    return (<View style={Object.assign({}, styles.calendar, this.props.style)}>
      { this.state.showCalendar ? <Calendar
        {...calendarStyles}
        minDate={moment('1985-01-01').startOf('day')}
        selected={this.state.date}
        onChange={this.onChange}
      /> : <TouchableOpacity onPress={this.toggleCalendar}>
        <TextInput
          editable={false}
          value={moment(this.state.date).format('YYYY-MM-DD')}
        />
      </TouchableOpacity> }
    </View>);
  }
}
