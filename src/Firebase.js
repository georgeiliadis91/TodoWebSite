import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyCxwtyh0gnSkeFoxQNVnQkMtT4EvuCWglg',
  authDomain: 'todolistdemo-dd65e.firebaseapp.com',
  databaseURL: 'https://todolistdemo-dd65e.firebaseio.com',
  projectId: 'todolistdemo-dd65e',
  storageBucket: 'todolistdemo-dd65e.appspot.com',
  messagingSenderId: '213941271083'
};
export const firebaseApp = firebase.initializeApp(config);

export const firebaseAuth = firebase.auth;
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const Fdatabase = firebase.database();
export const ref = Fdatabase.ref();
