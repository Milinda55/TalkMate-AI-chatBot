// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-vYA_lbNB3B0K91ZFATf6F53ur23WmiY",
    authDomain: "ai-bot-authentication.firebaseapp.com",
    projectId: "ai-bot-authentication",
    storageBucket: "ai-bot-authentication.firebasestorage.app",
    messagingSenderId: "832556367958",
    appId: "1:832556367958:web:a5ef9af8755c84dde17bf7",
    measurementId: "G-SCK6X4VZEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);