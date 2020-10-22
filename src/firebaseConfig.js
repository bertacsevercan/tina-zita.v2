import * as firebase from 'firebase';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCpUk4RtMohc1fg4WoljZUZrLGDWVfrlyU",
    authDomain: "tina-zita-2.firebaseapp.com",
    databaseURL: "https://tina-zita-2.firebaseio.com",
    projectId: "tina-zita-2",
    storageBucket: "tina-zita-2.appspot.com",
    messagingSenderId: "529532594205",
    appId: "1:529532594205:web:24a37b81025e0b17fc7ef4"
  };
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();

export const Auth = firebase.auth;
