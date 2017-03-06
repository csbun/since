import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import {
  Screen,
  Text,
  View,
  TextInput,
  Button,
} from '@shoutem/ui';
import Calendar from 'react-native-calendar-datepicker';
import { addItem } from '../actions/items';
import {
  navigation as navigationPropType,
  currentUser as currentUserPropType,
  // item as itemPropType,
} from '../utils/prop_types';
import { toMidnightTimeStamp } from '../utils/calculator';
import calendarStyles from '../utils/calendar_styles';

const styles = {
  screen: {
    padding: 10,
    flexGrow: 1,
  },
  calendar: {
    flexGrow: 1,
    // marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
};


class Editor extends Component {

  static propTypes = {
    addItem: PropTypes.func.isRequired,
    navigation: navigationPropType.isRequired,
    currentUser: currentUserPropType.isRequired,
  }

  static navigationOptions = {
    title: 'Item',
  }

  constructor() {
    super();
    this.onSave = this.onSave.bind(this);
    this.state = {
      title: '',
      // desc: '',
      date: toMidnightTimeStamp(new Date()),
    };
  }

  onSave() {
    if (!this.state.title) {
      return;
    }
    const { uid } = this.props.currentUser;
    this.props.addItem(uid, this.state);
    this.props.navigation.goBack();
  }

  render() {
    // console.log(new Date(this.state.date));
    return (<Screen style={styles.screen}>
      <TextInput
        placeholder="Title"
        onChangeText={title => this.setState({ title })}
        value={this.state.title}
      />
      <View style={{flexDirection: 'row'}}>
        <View style={styles.calendar}>
          <Calendar
            {...calendarStyles}
            minDate={moment('1985-01-01').startOf('day')}
            selected={new Date(this.state.date)}
            onChange={(date) => { this.setState({ date }); }}
          />
        </View>
      </View>
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
  return bindActionCreators({ addItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
