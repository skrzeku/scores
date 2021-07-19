import firebase from "@firebase/app";
import "firebase/auth";
import "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyD5QPGtKbfUbRh8G7Trx2o9aJQozlDafU8",
    // authDomain: "scores-9e018.firebaseapp.com",
    // projectId: "scores-9e018",
    // storageBucket: "scores-9e018.appspot.com",
    // messagingSenderId: "449860288089",
    // appId: "1:449860288089:web:8bf83788a0819a1562fb48"
    apiKey: "AIzaSyDcDV4jkQVyNlMdlUOVVhLvrL6p4GyP5tw",
    authDomain: "scores-2b11a.firebaseapp.com",
    projectId: "scores-2b11a",
    storageBucket: "scores-2b11a.appspot.com",
    messagingSenderId: "518523111794",
    appId: "1:518523111794:web:042657c3d319c60d6ff5eb",
    measurementId: "G-M5VCHQ98FF"
};

//im db
// apiKey: "AIzaSyDcDV4jkQVyNlMdlUOVVhLvrL6p4GyP5tw",
//     authDomain: "scores-2b11a.firebaseapp.com",
//     projectId: "scores-2b11a",
//     storageBucket: "scores-2b11a.appspot.com",
//     messagingSenderId: "518523111794",
//     appId: "1:518523111794:web:042657c3d319c60d6ff5eb",
//     measurementId: "G-M5VCHQ98FF"
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();





export default firebase;