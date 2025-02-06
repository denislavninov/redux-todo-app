import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCupyfiBBL-0LmatAM9xHwQbKOVqADNf3I",
  authDomain: "my-todo-app-3caa9.firebaseapp.com",
  projectId: "my-todo-app-3caa9",
  storageBucket: "my-todo-app-3caa9.firebasestorage.app",
  messagingSenderId: "978742944121",
  appId: "1:978742944121:web:2757902d613efb5758cfa8",
  databaseURL: "https://my-todo-app-3caa9-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);

// Function to load todos from Firestore
async function loadTodos() {
  try {
    const todosCol = collection(db, "todos");
    const todoSnapshot = await getDocs(todosCol);
    const todoList = todoSnapshot.docs.map((doc) => doc.data());
    return todoList;
  } catch (error) {
    console.error("Error loading todos:", error);
  }
}

// Function to add a new todo
async function addTodo(todo) {
  await addDoc(collection(db, "todos"), { text: todo });
}

// Function to sign in a user
async function signIn(email, password) {
  const auth = getAuth(app);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log("User signed in:", userCredential.user.email);
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
}

// Call loadTodos on app initialization to fetch existing todos
const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.email);
    loadTodos(); // Kullanıcı giriş yaptıysa loadTodos'u çağır
  } else {
    console.log("No user is signed in.");
  }
});

// Call this function with the user's email and password
// signIn("user@example.com", "userpassword");

export { app, database };
