import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyALDGJ9Zj0dW3jHsYW-ZIjBbzV81Ix97c8",
  authDomain: "krumpuss-66a56.firebaseapp.com",
  projectId: "krumpuss-66a56",
  storageBucket: "krumpuss-66a56.appspot.com",
  messagingSenderId: "610145345844",
  appId: "1:610145345844:web:2e50cb27fdb4b45164c561"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }