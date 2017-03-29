import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Calendar from 'react-native-calendar-datepicker';
import {
  View,
} from '@shoutem/ui';
import calendarStyles from '../utils/calendar_styles';


const styles = {
  calendar: {
    backgroundColor: '#fff',
  },
};


export default class DatePicker extends Component {
  static propTypes = {
    style: PropTypes.object,
    defaultDate: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    style: {},
    defaultDate: undefined,
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      date: props.defaultDate ? new Date(props.defaultDate) : new Date(),
    };
  }

  onChange(date) {
    this.setState({ date });
    this.props.onChange(date);
  }

  render() {
    return (<View style={Object.assign({}, styles.calendar, this.props.style)}>
      <Calendar
        {...calendarStyles}
        minDate={moment('1985-01-01').startOf('day')}
        selected={this.state.date}
        onChange={this.onChange}
      />
    </View>);
  }
}
