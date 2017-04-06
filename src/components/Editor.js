import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Screen,
  Text,
  TextInput,
  Button,
} from '@shoutem/ui';
import CheckBox from 'react-native-checkbox';
import { addItem, updateItem } from '../actions/items';
import {
  navigation as navigationPropType,
  currentUser as currentUserPropType,
  // item as itemPropType,
} from '../utils/prop_types';
import { toMidnightTimeStamp } from '../utils/calculator';
import DatePicker from './DatePicker';

const styles = {
  screen: {
    padding: 10,
    // flexGrow: 1,
  },
  calendar: {
    // flexGrow: 1,
    // marginTop: 5,
    marginBottom: 5,
  },
};


class Editor extends Component {

  static propTypes = {
    updateItem: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    navigation: navigationPropType.isRequired,
    currentUser: currentUserPropType.isRequired,
  }

  static navigationOptions = {
    title: 'Edit',
  }

  constructor(props) {
    super(props);
    // extend props from navigate when edit existed item
    this.state = Object.assign({
      title: '',
      // desc: '',
      date: toMidnightTimeStamp(new Date()),
      stopTracking: false,
    }, props.navigation.state.params);
    this.isEdit = !!this.state.uniqueKey;
  }

  onChangeStopTracking = (checked) => {
    const stopTracking = !checked; // checked 居然是 before 值...
    let { endDate } = this.state;
    if (stopTracking && !endDate) {
      endDate = toMidnightTimeStamp(new Date());
    }
    this.setState({ stopTracking, endDate });
  }

  onSave = () => {
    if (!this.state.title) {
      return;
    }
    const { uid } = this.props.currentUser;
    if (this.isEdit) {
      this.props.updateItem(uid, this.state);
    } else {
      this.props.addItem(uid, this.state);
    }
    this.props.navigation.goBack();
  }

  render() {
    const stopTrackingCheckbox = this.isEdit ? (<CheckBox
      label="Stop tracking this Event"
      checked={this.state.stopTracking}
      onChange={this.onChangeStopTracking}
    />) : null;
    const endDatePicker = this.state.stopTracking ? (<DatePicker
      style={styles.calendar}
      defaultDate={this.state.endDate}
      onChange={endDate => this.setState({ endDate })}
    />) : null;
    return (<Screen style={styles.screen}>
      <TextInput
        placeholder="Title"
        onChangeText={title => this.setState({ title })}
        value={this.state.title}
      />
      <DatePicker
        style={styles.calendar}
        defaultDate={this.state.date}
        showCalendar={!this.isEdit}
        onChange={date => this.setState({ date })}
      />
      { stopTrackingCheckbox }
      { endDatePicker }
      <Button
        disabled={!this.state.title}
        onPress={this.onSave}
        accessibilityLabel="Press to save"
      ><Text style={{ color: this.state.title ? '#000' : '#aaa' }}>Save</Text></Button>
    </Screen>);
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addItem, updateItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
