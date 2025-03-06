// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {getFirestore, } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC7K1QabqTZT11o429oTNHKvDtGxmEYmyc",
  authDomain: "nutrition20-faf32.firebaseapp.com",
  projectId: "nutrition20-faf32",
  storageBucket: "nutrition20-faf32.firebasestorage.app",
  messagingSenderId: "51027341355",
  appId: "1:51027341355:web:146cd149fe5604efdc3a6e",
  measurementId: "G-X1881GT839"
};



// Log Firestore activity
console.log("Firestore logging enabled");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
