// // Import Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
// import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
// import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
//
// // Firebase config
// const firebaseConfig = {
//     apiKey: "AIzaSyC-vYA_lbNB3B0K91ZFATf6F53ur23WmiY",
//     authDomain: "ai-bot-authentication.firebaseapp.com",
//     databaseURL: "https://ai-bot-authentication-default-rtdb.asia-southeast1.firebasedatabase.app/",
//     projectId: "ai-bot-authentication",
//     storageBucket: "ai-bot-authentication.appspot.com",
//     messagingSenderId: "832556367958",
//     appId: "1:832556367958:web:a5ef9af8755c84dde17bf7",
//     measurementId: "G-SCK6X4VZEW"
// };
//
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
// const database = getDatabase(app);
// const provider = new GoogleAuthProvider();
//
// // Function to store user data in Firebase Database
// function storeUserData(user) {
//     set(ref(database, "users/" + user.uid), {
//         name: user.displayName || "Anonymous",
//         email: user.email,
//         uid: user.uid
//     }).then(() => {
//         console.log("User data stored successfully!");
//     }).catch((error) => {
//         console.error("Error storing user data:", error);
//     });
// }
//
// // Export modules for use in login page
// export { auth, provider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, storeUserData };
