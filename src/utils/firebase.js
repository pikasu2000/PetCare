import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeCfFHctC9nQs2x685xF0X9QEz0-eVimY",
  authDomain: "petcare-6ddcc.firebaseapp.com",
  projectId: "petcare-6ddcc",
  storageBucket: "petcare-6ddcc.firebasestorage.app",
  messagingSenderId: "984906394508",
  appId: "1:984906394508:web:ce6d42e84e21a0b0fe84a9",
  measurementId: "G-GFPGFZL73Q",
  databaseURL:
    "https://petcare-6ddcc-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
