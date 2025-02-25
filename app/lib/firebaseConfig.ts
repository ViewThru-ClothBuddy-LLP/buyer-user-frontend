// // lib/firebase.ts
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// import { initializeApp, getApps } from 'firebase/app';
// import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID

// };

// // Initialize Firebase
// const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// export { auth, googleProvider };

