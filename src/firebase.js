// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: "my-last-todo.firebasestorage.app",
  messagingSenderId: "885214813453",
  appId: "1:885214813453:web:1501069d7f1d7e9473e444",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const todosCollection = collection(db, "todos");


export { app, db, todosCollection };
