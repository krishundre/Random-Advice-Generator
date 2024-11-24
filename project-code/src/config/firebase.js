// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBENzduKOLbVEFJ_ZpqBQc0rE5OAHzO-yw",
    authDomain: "rag-db.firebaseapp.com",
    projectId: "rag-db",
    storageBucket: "rag-db.firebasestorage.app",
    messagingSenderId: "314931676683",
    appId: "1:314931676683:web:3af683c5d758275715290e",
    measurementId: "G-KEDGXCCLH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
