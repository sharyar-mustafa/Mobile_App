import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDdNNBkHKwJSb0gawWYWdssp8ktswkz84",

  authDomain: "saylani-khana-sab-k-liye.firebaseapp.com",

  projectId: "saylani-khana-sab-k-liye",

  storageBucket: "saylani-khana-sab-k-liye.appspot.com",

  messagingSenderId: "842887039830",

  appId: "1:842887039830:web:4eae55e1b3ec71447824f7"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth();
const db = getFirestore();



export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  db,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  orderBy
};