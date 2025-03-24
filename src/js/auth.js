import { auth, onAuthStateChanged } from "./firebase-config.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User already logged in:", user);
        window.location.href = "index.html"; // Redirect if already logged in
    }
});
