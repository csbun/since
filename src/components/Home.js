import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  ListView,
} from 'react-native';
// import * as firebase from 'firebase';
import { DETAIL } from '../constants/page';
import ListItem from './list/ListItem';
// import FIREBASE_CONFIG from '../constants/firebase';

// Initialize Firebase
// const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);

const styles = {
  banner: {
    height: 200,
  },
};


export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    // // Or the title string may be a function of the navigation prop:
    // title: ({ state }) => `Chat with ${state.params.user}`
    header({ navigate }) {
      return {
        right: <Button
          title="Add"
          onPress={() => navigate(DETAIL, {})}
        />,
      };
    },
  }

  constructor() {
    super();
    // this.itemsRef = firebaseApp.database().ref().child('items');
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
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
        dataSource: this.state.dataSource.cloneWithRows(items),
      });
    });
  }

  renderListItem(item) {
    return (
      <ListItem item={item} onPress={() => {}} />
    );
  }

  addItem() {
    this.itemsRef.push({ title: `item-${Math.random()}` });
  }

  render() {
    return (<View>
      <View style={styles.banner}>
        <Text>TODO</Text>
      </View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderListItem.bind(this)}
        style={styles.listview}
      />
      <Button title="Add" onPress={this.addItem.bind(this)} />
    </View>);
  }

}
