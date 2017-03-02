import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Screen,
  View,
  Text,
  Button,
  ListView,
  Subtitle,
} from '@shoutem/ui';
import { fetchItems } from '../actions/items';
import { DETAIL } from '../constants/page';
import ListItem from './ListItem';
import {
  navigation as navigationPropType,
  currentUser as currentUserPropType,
  item as itemPropType,
} from '../utils/prop_types';

const styles = {
  banner: {
    height: 200,
    backgroundColor: '#61AFEF',
  },
};


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

  // constructor(props) {
  //   super(props);
  //   const { uid } = this.props.currentUser;
  //   this.itemsRef = firebaseDb.ref().child(`items/user-${uid}`);
  //   this.state = {
  //     loading: true,
  //     items: [],
  //     // dataSource: new ListView.DataSource({
  //     //   rowHasChanged: (row1, row2) => row1 !== row2,
  //     // }),
  //   };
  // }

  componentWillMount() {
    const { uid } = this.props.currentUser;
    this.props.fetchItems(uid);
    // this.listenForItems(this.itemsRef);
  }


  // listenForItems(itemsRef) {
  //   itemsRef.on('value', (snap) => {
  //     // get children as an array
  //     const items = [];
  //     snap.forEach((child) => {
  //       items.push({
  //         title: child.val().title,
  //         _key: child.key,
  //       });
  //     });
  //
  //     this.setState({
  //       loading: false,
  //       items,
  //       // dataSource: this.state.dataSource.cloneWithRows(items),
  //     });
  //   });
  // }

  goAddItem() {
    const { navigate } = this.props.navigation;
    navigate(DETAIL);
  }

  render() {
    const { list, loading } = this.props.items;

    let banner;
    if (!list || !list.length) {
      banner = (<View>
        <Subtitle
          style={{ textAlign: 'center', marginTop: 80, marginBottom: 80 }}
        >Press Add and Enjoy!</Subtitle>
      </View>);
    } else {
      banner = (<View style={styles.banner}>
        <Text>&nbsp;</Text>
      </View>);
    }

    return (<Screen>
      { banner }
      <ListView
        style={styles.listview}
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
