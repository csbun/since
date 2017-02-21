// https://firebase.googleblog.com/2016/01/the-beginners-guide-to-react-native-and_84.html

// import * as firebase from 'firebase';
// import FIREBASE_CONFIG from '../constants/firebase';

// Initialize Firebase
// TODO: move to action
// const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
//
// const itemsRef = firebaseApp.database().ref().child('items');
// itemsRef.on('value', (snap) => {
//   // get children as an array
//   const rows = snap.map(child => ({
//     title: child.val().title,
//     _key: child.key,
//   }));
//
//   this.setState({
//     dataSource: this.state.dataSource.cloneWithRows(rows),
//   });
// });

export default function items() {
  // return itemsRef;
  return [];
}
