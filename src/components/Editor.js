import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Screen,
  Text,
  TextInput,
  Button,
} from '@shoutem/ui';
import { addItem } from '../actions/items';
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
    addItem: PropTypes.func.isRequired,
    navigation: navigationPropType.isRequired,
    currentUser: currentUserPropType.isRequired,
  }

  static navigationOptions = {
    title: 'Item',
  }

  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    // TODO: how props from navigate?
    this.state = Object.assign({
      title: '',
      // desc: '',
      date: toMidnightTimeStamp(new Date()),
    }, props.navigation.state.params);
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
    // let endDate = !this.state.uniqueKey ? null : <View />;
    // console.log(new Date(this.state.date));
    return (<Screen style={styles.screen}>
      <TextInput
        placeholder="Title"
        onChangeText={title => this.setState({ title })}
        value={this.state.title}
      />
      <DatePicker
        style={styles.calendar}
        defaultDate={this.state.date}
        onChange={date => this.setState({ date })}
      />
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
