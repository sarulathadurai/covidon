import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBnRv1qgUDJ1xBXo__XP8p7VMDEesvUUOU",
    authDomain: "covidon-14941.firebaseapp.com",
    projectId: "covidon-14941",
    storageBucket: "covidon-14941.appspot.com",
    messagingSenderId: "397409098616",
    appId: "1:397409098616:web:5f40e9966f28da22be068d",
    measurementId: "G-0LL7JV3T5K"
  };

  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });

export default config;