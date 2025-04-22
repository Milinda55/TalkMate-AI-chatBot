import { auth, provider, signInWithPopup, signInWithEmailAndPassword, storeUserData } from "./firebase-config.js";

// Google Sign-In
document.addEventListener("DOMContentLoaded", () => {
    const googleLoginBtn = document.getElementById("google-login");

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener("click", async (event) => {
            event.preventDefault();
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                console.log("Google Sign-In Success:", user);
                storeUserData(user); // Store user in Firebase Database
                window.location.href = "index.html"; // Redirect to main page
            } catch (error) {
                console.error("Google Sign-In Error:", error.message);
            }
        });
    }
});

// Email/Password Login
document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Email Sign-In Success:", user);
        storeUserData(user); // Store user in Firebase Database
        window.location.href = "index.html"; // Redirect after login
    } catch (error) {
        console.error("Login Error:", error.message);
    }
});


