import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAT4US4_TWa6uSf73f5MguFI6R2Rkc151Q",
  authDomain: "cinema-ticket-2448b.firebaseapp.com",
  databaseURL: "https://cinema-ticket-2448b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cinema-ticket-2448b",
  storageBucket: "cinema-ticket-2448b.appspot.com",
  messagingSenderId: "592651460261",
  appId: "1:592651460261:web:4a69979279f5ff19fab74c"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
