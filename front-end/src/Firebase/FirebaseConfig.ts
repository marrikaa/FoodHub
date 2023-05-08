import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// require('dotenv').config()

const firebaseConfig = {
  apiKey: "AIzaSyA7dvZ65sgtcozNVdd4lfSTPgzCJ4e-EB8",
  authDomain: "foodhub-825ed.firebaseapp.com",
  databaseURL: "https://foodhub-825ed-default-rtdb.firebaseio.com",
  projectId: "foodhub-825ed",
  storageBucket: "foodhub-825ed.appspot.com",
  messagingSenderId: "374249567942",
  appId: "1:374249567942:web:ab9252773d8f3a5bdd49c7",
  measurementId: "G-K2MYEDFE6W"
};

// API_KEY =  "AIzaSyA7dvZ65sgtcozNVdd4lfSTPgzCJ4e-EB8",
// AUTH_DOMAIN = "foodhub-825ed.firebaseapp.com",
// PROJECT_ID = "foodhub-825ed",
// STORAGE_BUCKET = "foodhub-825ed.appspot.com",
// MESSAGING_SENDER_ID = "374249567942",
// APP_ID = "1:374249567942:web:ab9252773d8f3a5bdd49c7",
// MEASUREMENT_ID = "G-K2MYEDFE6W"

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export const dbConnection = db;
export const authenticator = auth;
export const dbStorage = storage;

