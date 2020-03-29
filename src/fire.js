import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyDyv1mUdvSGs0A4mOYXW8lZMv6rj2sDmCM",
  authDomain: "words-3dbfc.firebaseapp.com",
  databaseURL: "https://words-3dbfc.firebaseio.com",
  projectId: "words-3dbfc",
  storageBucket: "words-3dbfc.appspot.com",
  messagingSenderId: "571582939592",
  appId: "1:571582939592:web:9a83dae2f991937a9f80fd"
};
var fire = firebase.initializeApp(config);

export default fire;