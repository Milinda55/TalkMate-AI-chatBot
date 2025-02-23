
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
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
const auth = getAuth(app);

// Google Sign-In
document.getElementById("google-login").addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            console.log("User signed in:", result.user);
            window.location.href = "index.html";  // Redirect to main app
        })
        .catch((error) => {
            console.error("Error signing in:", error);
        });
});

// Check if user is already signed in
auth.onAuthStateChanged((user) => {
    if (user) {
        window.location.href = "index.html";  // Redirect if logged in
    }
});

