// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  addDoc,
  collection,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const providerEmail = new GoogleAuthProvider();
providerEmail.addScope("https://www.googleapis.com/auth/contacts.readonly");

const firebaseConfig = {
  apiKey: "AIzaSyAHGw7sDJQ2s8obHqEtxLqw-J3oBukOcK4",
  authDomain: "chat-app-18909.firebaseapp.com",
  projectId: "chat-app-18909",
  storageBucket: "chat-app-18909.appspot.com",
  messagingSenderId: "430825524211",
  appId: "1:430825524211:web:d5ab5a4fdc37090d796086",
  measurementId: "G-91ZH52TETH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

export {
  db,
  doc,
  addDoc,
  collection,
  providerEmail,
  auth,
  signInWithPopup,
  Timestamp,
  onSnapshot,
};
