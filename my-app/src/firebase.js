// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDgSxABzXk1_Fr70drhcZLq2UBs5mXOvc",
  authDomain: "myproject-101ad.firebaseapp.com",
  projectId: "myproject-101ad",
  storageBucket: "myproject-101ad.firebasestorage.app",
  messagingSenderId: "349579367710",
  appId: "1:349579367710:web:cfc30eaeb5108010e7650f",
  measurementId: "G-KYZMDKCKZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);