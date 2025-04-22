// Determine the base URL based on environment
const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocalDev
    ? 'http://localhost:3000/api/chatbot'  // For local development
    : "/api/chatbot";                      // For production
const API_URL = "/api/chatbot";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("user-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
    document.getElementById("send-btn").addEventListener("click", sendMessage);
});

async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("user", message);
    userInput.value = "";

    try {
        // Show loading indicator
        const loadingDiv = document.createElement("div");
        loadingDiv.className = "message-container bot-message-container";
        loadingDiv.innerHTML = `
            <img src="/img/bot-image.jpg" alt="Bot" class="profile-pic bot-pic">
<!--            <p class="bot-message">Thinking...</p>-->
        `;
        document.getElementById("chat-box").appendChild(loadingDiv);

        const botReply = await getAIResponse(message);

        // Remove loading indicator
        document.getElementById("chat-box").removeChild(loadingDiv);

        appendMessage("bot", botReply);
    } catch (error) {
        console.error("Detailed Error:", error);
        // Remove loading indicator if it exists
        const loadingIndicators = document.querySelectorAll(".bot-message-container");
        if (loadingIndicators.length > 0) {
            loadingIndicators[loadingIndicators.length - 1].remove();
        }
        appendMessage("bot", "Sorry, I'm having trouble connecting to the AI. Please try again later.");
    }
}

async function getAIResponse(userMessage) {
    try {
        console.log("Sending to API:", API_URL, "Message:", userMessage);

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userMessage })
        });

        console.log("API response status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("API Error Response:", errorText);
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log("API Success Response:", data);

        return data.generated_text || data.message || "I didn't understand that.";
    } catch (error) {
        console.error("Full API Error:", error);
        throw error;
    }
}

function appendMessage(role, message) {
    const chatBox = document.getElementById("chat-box");
    const messageContainer = document.createElement("div");
    messageContainer.className = `message-container ${role}-message-container`;

    const profilePic = document.createElement("img");
    profilePic.className = `profile-pic ${role}-pic`;
    profilePic.src = role === "user" ? "./img/milley.png" : "./img/bot-image.jpg";
    profilePic.alt = role === "user" ? "User" : "Bot";

    const messageDiv = document.createElement("p");
    messageDiv.className = `${role}-message`;
    messageDiv.textContent = message;

    messageContainer.appendChild(profilePic);
    messageContainer.appendChild(messageDiv);
    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}