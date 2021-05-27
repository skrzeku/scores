import firebase from "@firebase/app";
import "firebase/auth";
import "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5QPGtKbfUbRh8G7Trx2o9aJQozlDafU8",
    authDomain: "scores-9e018.firebaseapp.com",
    projectId: "scores-9e018",
    storageBucket: "scores-9e018.appspot.com",
    messagingSenderId: "449860288089",
    appId: "1:449860288089:web:8bf83788a0819a1562fb48"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();





export default firebase;