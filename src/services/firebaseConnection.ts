import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvZnTTOuky1wFHSte5yr3MwuzI0Eb64pw",
  authDomain: "bookly-c69d2.firebaseapp.com",
  projectId: "bookly-c69d2",
  storageBucket: "bookly-c69d2.firebasestorage.app",
  messagingSenderId: "567658825042",
  appId: "1:567658825042:web:d60b3004f5afa8b019268b",
  measurementId: "G-F84BCCYB02"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider }