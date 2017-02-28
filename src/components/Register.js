import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Screen,
  Text,
  TextInput,
  Button,
} from '@shoutem/ui';
import { registerUser } from '../actions/firebase';

class Register extends Component {

  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    // navigation: PropTypes.shape({
    //   navigate: PropTypes.func.isRequired,
    // }).isRequired,
  }

  static navigationOptions = {
    title: 'Sign Up',
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
    this.props.registerUser({ email, password })
      .then((data) => {
        if (data.payload.errorCode) {
          this.setState({ message: data.payload.errorMessage });
        }
      });
  }

  render() {
    return (<Screen style={{ padding: 10 }}>
      <TextInput
        placeholder="Email"
        onChangeText={email => this.setState({ email })}
      />
      <TextInput
        placeholder="Password"
        onChangeText={password => this.setState({ password })}
      />
      <Button styleName="dark" onPress={() => { this.onFormSubmit(); }} >
        <Text>Sign Up</Text>
      </Button>
      <Text>{this.state.message}</Text>
    </Screen>);
  }

    // render() {
    //     return (
    //         <div className="col-md-4">
    //             <form id="frmRegister" role="form" onSubmit={this.onFormSubmit}>
    //                 <p>{this.state.message}</p>
    //                 <h2>Register</h2>
    //                 <div className="form-group">
    //                     <label htmlFor="txtRegEmail">Email address</label>
    //                     <input
    //                       type="email" className="form-control" ref="email" id="txtEmail" placeholder="Enter email"
    //                       name="email"
    //                     />
    //                 </div>
    //                 <div className="form-group">
    //                     <label htmlFor="txtRegPass">Password</label>
    //                     <input
    //                       type="password" className="form-control" ref="password" id="txtPass" placeholder="Password"
    //                       name="password"
    //                     />
    //                 </div>
    //                 <button type="submit" className="btn btn-default">Register</button>
    //                 <br /> <br />
    //
    //                 <a
    //                   href="#" className="btn btn-block btn-social btn-facebook" onClick={() => {
    //                       this.loginWithProvider('facebook');
    //                   }} data-provider="facebook"
    //                 >Facebook</a>
    //                 <a
    //                   href="#" className="btn btn-block btn-social btn-twitter" onClick={() => {
    //                       this.loginWithProvider('twitter');
    //                   }} data-provider="twitter"
    //                 >Twitter</a>
    //                 <a
    //                   href="#" className="btn btn-block btn-social btn-google" onClick={() => {
    //                       this.loginWithProvider('google');
    //                   }} data-provider="twitter"
    //                 >Google</a>
    //                 <a
    //                   href="#" className="btn btn-block btn-social btn-github" onClick={() => {
    //                       this.loginWithProvider('github');
    //                   }} data-provider="twitter"
    //                 >Github</a>
    //
    //             </form>
    //         </div>
    //     );
    // }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    registerUser,
  }, dispatch);
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
