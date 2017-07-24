import firebase from 'firebase';

try {
  var config = {
    apiKey: "AIzaSyAj1rFZNkdd86AVTRRPyi6zAaQUBZ74z8w",
    authDomain: "david-todo-app-a2782.firebaseapp.com",
    databaseURL: "https://david-todo-app-a2782.firebaseio.com",
    projectId: "david-todo-app-a2782",
    storageBucket: "david-todo-app-a2782.appspot.com",
    messagingSenderId: "26723724647"
  };

  firebase.initializeApp(config);
} catch (error) {
  console.log('ERROR', error);
}

export var firebaseRef = firebase.database().ref();
export default firebase;