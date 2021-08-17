import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.VUE_APP_APIKEY,
    authDomain: process.env.VUE_APP_AUTHDOMAIN,
    projectId: "ccontrol-f7eb7",
    storageBucket: "ccontrol-f7eb7.appspot.com",
    messagingSenderId: "136436737802",
    appId: process.env.VUE_APP_APPID,
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Auth
  const auth = firebase.auth();
  // Storage
  const storage = firebase.storage();
  // DB
const db = firebase.firestore();

  // Exports
  export {auth, storage, db};