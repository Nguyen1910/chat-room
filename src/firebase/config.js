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
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const providerEmail = new GoogleAuthProvider();
providerEmail.addScope("https://www.googleapis.com/auth/contacts.readonly");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_NAME_PROJECT,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
// Initialize Firebase
getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

const storage = getStorage(app);

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
  storage,
};
