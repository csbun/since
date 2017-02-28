import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { fetchUser } from '../actions/firebase';
import Loading from './Loading';
import Login from './Login';
import Register from './Register';
import Editor from './Editor';
import Home from './Home';
import { HOME, DETAIL, LOGIN, REGISTER } from '../constants/page';

const AppStackNavigator = StackNavigator({
  [HOME]: { screen: Home },
  [DETAIL]: { screen: Editor },
}, {
  initialRouteName: HOME,
});

const LoginStackNavigator = StackNavigator({
  [LOGIN]: { screen: Login },
  [REGISTER]: { screen: Register },
}, {
  initialRouteName: LOGIN,
});

class App extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
      uid: PropTypes.string,
    }),
  }

  static defaultProps = {
    currentUser: {},
  }

  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    const { currentUser } = this.props;
    if (!currentUser) {
      return <Loading />;
    }
    return currentUser.uid ? <AppStackNavigator /> : <LoginStackNavigator />;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch);
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
