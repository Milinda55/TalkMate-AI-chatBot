// import './firebase-config.js';

import firebase from "firebase/compat";

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("user-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput) return; //

    appendMessage("user", userInput);
    document.getElementById("user-input").value = "";

    let botReply = await getAIResponse(userInput);
    appendMessage("bot", botReply);
}

async function getAIResponse(userMessage) {
    const API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";
    const API_KEY = "";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: userMessage })
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (Array.isArray(data) && data.length > 0) {
            const generatedText = data[0].generated_text;
            if (generatedText) {
                return generatedText;
            }
        }

        if (data.error) {
            console.error("API Error:", data.error);
            return "Sorry, I couldn't generate a response.";
        }

        return "Sorry, I couldn't generate a response.";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Oops! Something went wrong. Please try again.";
    }
}

function appendMessage(role, message) {
    let chatBox = document.getElementById("chat-box");
    let messageContainer = document.createElement("div");
    messageContainer.className = `message-container ${role}-message-container`;

    // Add profile picture
    let profilePic = document.createElement("img");
    profilePic.className = `profile-pic ${role}-pic`;
    profilePic.src = role === "user" ? "img/milley.png" : "img/bot-image.jpg";
    profilePic.alt = role === "user" ? "user" : "Bot";
    messageContainer.appendChild(profilePic);

    // Add message
    let messageDiv = document.createElement("p");
    messageDiv.className = `${role}-message`;
    messageDiv.textContent = message;
    messageContainer.appendChild(messageDiv);

    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Redirect to login if not authenticated
firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = "index.html"; // Redirect to login if not signed in
    }
});


