// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKR-IjSs2Bw-0yQi-e_KzcMUwBnOFVV2Q",
  authDomain: "houp-b0566.firebaseapp.com",
  projectId: "houp-b0566",
  storageBucket: "houp-b0566.firebasestorage.app",
  messagingSenderId: "148627717280",
  appId: "1:148627717280:web:a7c8b50aea408193cc5dc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export  {app, db};