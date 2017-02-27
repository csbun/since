import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { fetchUser, logoutUser } from '../actions/firebase';
import Login from './Login';
import Editor from './Editor';
import Home from './Home';
import { HOME, DETAIL } from '../constants/page';

const AppStackNavigator = StackNavigator({
  [HOME]: { screen: Home },
  [DETAIL]: { screen: Editor },
}, {
  initialRouteName: HOME,
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
    const { uid } = this.props.currentUser || {};
    return uid ? <AppStackNavigator /> : <Login />;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser, logoutUser }, dispatch);
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
