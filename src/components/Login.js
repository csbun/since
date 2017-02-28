// https://github.com/btomashvili/react-redux-firebase-boilerplate/blob/master/src/app/components/user/login.jsx

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Screen,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from '@shoutem/ui';
import { loginUser, fetchUser, loginWithProvider } from '../actions/firebase';
import { REGISTER } from '../constants/page';

class UserLogin extends Component {

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: 'Login',
  }

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      email: '',
      password: '',
      message: '',
    };
  }

  onFormSubmit() {
    const { email, password } = this.state;
    this.setState({ message: '' });
    this.props.loginUser({ email, password })
      .then((data) => {
        if (data.payload.errorCode) {
          this.setState({ message: data.payload.errorMessage });
        }
      });
  }

  // // 无法使用 loginWithProvider，可能因为是基于 web 的。
  // loginWithProvider(provider) {
  //   this.props.loginWithProvider(provider)
  //     .then((data) => {
  //       if (data.payload.errorCode) {
  //         this.setState({ message: data.payload.errorMessage });
  //       }
  //     });
  // }

  render() {
    const { navigate } = this.props.navigation;

    return (<Screen style={{ padding: 10 }}>
      <TextInput
        placeholder="Email"
        onChangeText={email => this.setState({ email })}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        onChangeText={password => this.setState({ password })}
      />
      <Button styleName="dark" onPress={() => { this.onFormSubmit(); }} >
        <Text>Login</Text>
      </Button>
      <Text>{this.state.message}</Text>
      <TouchableOpacity
        onPress={() => navigate(REGISTER)}
      ><Text>Sign Up For Free!</Text></TouchableOpacity>
    </Screen>);
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginUser,
    fetchUser,
    loginWithProvider,
  }, dispatch);
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
