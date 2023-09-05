import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

let firebaseConfig = {
  apiKey: "AIzaSyDd_mo5vflCwtT23Fjz6cao4_EJeX6sWVY",
  authDomain: "estacionamento-f0704.firebaseapp.com",
  projectId: "estacionamento-f0704",
  storageBucket: "estacionamento-f0704.appspot.com",
  messagingSenderId: "805427153613",
  appId: "1:805427153613:web:04dcf479222f4cb4bd3784",
  measurementId: "G-XWJVJK30RS",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export default db;
