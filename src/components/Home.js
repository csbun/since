import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Screen,
  Text,
  Button,
  ListView,
} from '@shoutem/ui';
import { fetchItems } from '../actions/items';
import { DETAIL } from '../constants/page';
import ListItem from './ListItem';
import Banner from './Banner';
import {
  navigation as navigationPropType,
  currentUser as currentUserPropType,
  item as itemPropType,
} from '../utils/prop_types';

class Home extends Component {
  static propTypes = {
    fetchItems: PropTypes.func.isRequired,
    items: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      list: PropTypes.arrayOf(itemPropType),
    }).isRequired,
    currentUser: currentUserPropType.isRequired,
    navigation: navigationPropType.isRequired,
  }

  static navigationOptions = {
    header: {
      visible: false,
    },
  }

  componentWillMount() {
    const { uid } = this.props.currentUser;
    this.props.fetchItems(uid);
  }

  goAddItem() {
    const { navigate } = this.props.navigation;
    navigate(DETAIL);
  }

  render() {
    const { list, loading } = this.props.items;

    return (<Screen>
      <Banner />
      <ListView
        loading={loading}
        data={list}
        renderRow={item => <ListItem {...item} />}
      />
      <Button onPress={this.goAddItem.bind(this)}>
        <Text>Add</Text>
      </Button>
    </Screen>);
  }

}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchItems }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
