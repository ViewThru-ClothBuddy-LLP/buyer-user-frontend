// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: //"Use firebase api here ",
  authDomain: //"use domain here in quotes",
  projectId: "clothbuddyauth",
  storageBucket: //"",
  messagingSenderId: //"",
  appId: //"",
  measurementId: "G-46DH4QBSSC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
