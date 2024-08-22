
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAt0Cb9wDU4ZMQBpeKYfKaTGHeP9B_fbwE",
  authDomain: "flashcards-b571a.firebaseapp.com",
  projectId: "flashcards-b571a",
  storageBucket: "flashcards-b571a.appspot.com",
  messagingSenderId: "439220971734",
  appId: "1:439220971734:web:7b7343038645e560274177",
  measurementId: "G-XR33GDB2Z2"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
