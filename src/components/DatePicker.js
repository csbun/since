import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Calendar from 'react-native-calendar-datepicker';
import {
  View,
  TextInput,
  TouchableOpacity,
} from '@shoutem/ui';
import calendarStyles from '../utils/calendar_styles';
import { toMidnightTimeStamp, formatDate } from '../utils/calculator';

const MIN_DATE = moment('1985-01-01').startOf('day');

const styles = {
  calendar: {
    backgroundColor: '#fff',
  },
};

// TODO: support minDate
export default class DatePicker extends Component {
  static propTypes = {
    style: PropTypes.object,
    defaultDate: PropTypes.number,
    forceShowCalendar: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    style: {},
    forceShowCalendar: false,
    defaultDate: undefined,
  }

  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false,
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
      { this.state.showCalendar || this.props.forceShowCalendar ? <Calendar
        {...calendarStyles}
        minDate={MIN_DATE}
        maxDate={moment()}
        selected={this.state.date}
        onChange={this.onChange}
      /> : <TouchableOpacity onPress={this.toggleCalendar}>
        <TextInput
          editable={false}
          value={formatDate(this.state.date)}
        />
      </TouchableOpacity> }
    </View>);
  }
}
