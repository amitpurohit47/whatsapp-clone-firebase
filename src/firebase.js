// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCKuiIowN1YVpePVXfXB99DiHOT-mBvong",
    authDomain: "whatsapp-clone-firebase-ec251.firebaseapp.com",
    projectId: "whatsapp-clone-firebase-ec251",
    storageBucket: "whatsapp-clone-firebase-ec251.appspot.com",
    messagingSenderId: "445493510949",
    appId: "1:445493510949:web:7aca306f090c9c898350cc",
    measurementId: "G-0Q9PNBXHGB"
  };

const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;