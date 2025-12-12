import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDgSxABzXk1_Fr70drhcZLq2UBs5mXOvc",
  authDomain: "myproject-101ad.firebaseapp.com",
  projectId: "myproject-101ad",
  storageBucket: "myproject-101ad.firebasestorage.app",
  messagingSenderId: "349579367710",
  appId: "1:349579367710:web:cfc30eaeb5108010e7650f",
  measurementId: "G-KYZMDKCKZK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
