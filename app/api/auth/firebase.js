// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCABk-VTnCu9LQ5KpaCsPLpURb--f1jM-Q",
  authDomain: "clothbuddyauth.firebaseapp.com",
  projectId: "clothbuddyauth",
  storageBucket: "clothbuddyauth.appspot.com",
  messagingSenderId: "310491930725",
  appId: "1:310491930725:web:881bb3845b2ba9e85ee68c",
  measurementId: "G-46DH4QBSSC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };