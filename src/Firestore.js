import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_shylR5Oj_risMdHbsyFahpWt2330CwI",
    authDomain: "wacharlust.firebaseapp.com",
    projectId: "wacharlust",
    storageBucket: "wacharlust.appspot.com",
    messagingSenderId: "700139664934",
    appId: "1:700139664934:web:2d3f7c769bca09b46b98e7",
    measurementId: "G-2LFH0HPW5J"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore();

export default db;