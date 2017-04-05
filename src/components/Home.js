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
import { EDITOR } from '../constants/page';
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

  constructor(prop) {
    super(prop);
    this.goEdit = this.goEdit.bind(this);
    this.goAddItem = this.goAddItem.bind(this);
  }

  componentWillMount() {
    const { uid } = this.props.currentUser;
    this.props.fetchItems(uid);
  }

  goEdit(item) {
    const { navigate } = this.props.navigation;
    navigate(EDITOR, item);
  }

  goAddItem() {
    this.goEdit();
  }

  render() {
    const { list, loading } = this.props.items;

    return (<Screen>
      <Banner goEdit={this.goEdit} />
      <ListView
        loading={loading}
        data={list}
        renderRow={item => <ListItem {...item} />}
      />
      <Button onPress={this.goAddItem}>
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
