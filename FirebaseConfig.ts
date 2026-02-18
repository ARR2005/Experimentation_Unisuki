// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTjJxZ9QVM4-_KHeMNx9XKXSvVwRqCffQ",
  authDomain: "unisuki-e4676.firebaseapp.com",
  databaseURL:
    "https://unisuki-e4676-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "unisuki-e4676",
  storageBucket: "unisuki-e4676.firebasestorage.app",
  messagingSenderId: "534876741329",
  appId: "1:534876741329:web:3326b00e8af7a50d54aff0",
  measurementId: "G-TK0SKN1YPG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

