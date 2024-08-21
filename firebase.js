// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt0Cb9wDU4ZMQBpeKYfKaTGHeP9B_fbwE",
  authDomain: "flashcards-b571a.firebaseapp.com",
  projectId: "flashcards-b571a",
  storageBucket: "flashcards-b571a.appspot.com",
  messagingSenderId: "439220971734",
  appId: "1:439220971734:web:7b7343038645e560274177",
  measurementId: "G-XR33GDB2Z2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




export default db;
