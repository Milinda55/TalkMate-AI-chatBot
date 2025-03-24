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


