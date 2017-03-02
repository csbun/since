import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dimensions } from 'react-native';
import {
  Screen,
  Text,
  View,
  TextInput,
  Button,
} from '@shoutem/ui';
import Calendar from 'react-native-calendar-picker';
import { addItem } from '../actions/items';
import {
  navigation as navigationPropType,
  currentUser as currentUserPropType,
  // item as itemPropType,
} from '../utils/prop_types';

const ADAY = 1000 * 60 * 60 * 24;

const styles = {
  screen: {
    padding: 10,
  },
  calendar: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
};
const SCREEN_WIDTH = Dimensions.get('window').width;

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
      desc: '',
      date: Math.floor(Date.now() / ADAY) * ADAY,
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
    return (<Screen style={styles.screen}>
      <TextInput
        placeholder="Title"
        onChangeText={title => this.setState({ title })}
        value={this.state.title}
      />
      <TextInput
        placeholder="Description"
        multiline
        numberOfLines={2}
        onChangeText={desc => this.setState({ desc })}
        value={this.state.desc}
      />
      <View style={styles.calendar}>
        <Calendar
          selectedDate={new Date(this.state.date)}
          selectedDayColor="#61AFEF"
          screenWidth={SCREEN_WIDTH}
          onDateChange={(date) => { this.setState({ date: +date }); }}
        />
      </View>
      <Button
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
