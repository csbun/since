// https://github.com/btomashvili/react-redux-firebase-boilerplate/blob/master/src/app/components/user/login.jsx

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, View, TextInput, Button } from '../utils/react_native_ui';
// import { Text, View, TextInput, Button } from 'react-native';
import { loginUser, fetchUser, loginWithProvider } from '../actions/firebase';

const browserHistory = {
  push(dir) {
    console.log(dir);
  },
};


class UserLogin extends Component {

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    // loginWithProvider: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    // this.loginWithProvider = this.loginWithProvider.bind(this);
    this.state = {
      email: '',
      password: '',
      message: '',
    };
  }

  onFormSubmit() {
    const { email, password } = this.state;
    this.props.loginUser({ email, password })
      .then((data) => {
        if (data.payload.errorCode) {
          this.setState({ message: data.payload.errorMessage });
        } else {
          browserHistory.push('/profile');
        }
      });
  }

  // // 无法使用 loginWithProvider，可能因为是基于 web 的。
  // loginWithProvider(provider) {
  //   this.props.loginWithProvider(provider)
  //     .then((data) => {
  //       if (data.payload.errorCode) {
  //         this.setState({ message: data.payload.errorMessage });
  //       } else {
  //         browserHistory.push('/profile');
  //       }
  //     });
  // }

  render() {
    return (<View>
      <TextInput
        style={{ borderColor: 'gray', borderWidth: 1 }}
        onChangeText={email => this.setState({ email })}
        value={this.state.email}
      />
      <TextInput
        secureTextEntry
        style={{ borderColor: 'gray', borderWidth: 1 }}
        onChangeText={password => this.setState({ password })}
        value={this.state.password}
      />
      <Button onPress={() => { this.onFormSubmit(); }} >
        <Text>Login</Text>
      </Button>

      <Text>{this.state.message}</Text>
    </View>);
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
