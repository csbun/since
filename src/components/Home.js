import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Screen,
  View,
  Text,
  Button,
  ListView,
} from '@shoutem/ui';
import { DETAIL } from '../constants/page';
import ListItem from './list/ListItem';
import { firebaseDb } from '../utils/firebase';
import {
  navigation as navigationPropType,
  currentUser as currentUserPropType,
} from '../utils/prop_types'

const styles = {
  banner: {
    height: 200,
  },
};


class Home extends Component {
  static propTypes = {
    currentUser: currentUserPropType.isRequired,
    navigation: navigationPropType.isRequired,
  }

  static navigationOptions = {
    title: 'Home',
  }

  constructor(props) {
    super(props);
    const { uid } = this.props.currentUser;
    this.itemsRef = firebaseDb.ref().child(`items/${uid}`);
    this.state = {
      loading: true,
      items: [],
      // dataSource: new ListView.DataSource({
      //   rowHasChanged: (row1, row2) => row1 !== row2,
      // }),
    };
  }

  componentWillMount() {
    this.listenForItems(this.itemsRef);
  }


  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      const items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key,
        });
      });

      this.setState({
        loading: false,
        items,
        // dataSource: this.state.dataSource.cloneWithRows(items),
      });
    });
  }

  renderListItem(item) {
    return (
      <ListItem item={item} onPress={() => {}} />
    );
  }

  goAddItem() {
    const { navigate } = this.props.navigation;
    navigate(DETAIL);
    // this.itemsRef.push({ title: `item-${Math.random()}` });
  }

  render() {
    return (<Screen>
      <View style={styles.banner}>
        <Text>TODO</Text>
      </View>
      <ListView
        loading={this.state.loading}
        data={this.state.items}
        renderRow={this.renderListItem.bind(this)}
        style={styles.listview}
      />
    <Button onPress={this.goAddItem.bind(this)}>
      <Text>Add</Text>
    </Button>
    </Screen>);
  }

}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps)(Home);
