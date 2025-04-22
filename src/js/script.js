// Define the API URL here
const API_URL = "https://ai-chat-bot-project-ip5n1a1oz-milindas-projects-a6b73602.vercel.app/api/chatbot";

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
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userMessage })
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (data.error) {
            console.error("API Error:", data.error);
            return "Sorry, I couldn't generate a response.";
        }

        return data.generated_text || "Sorry, I couldn't generate a response.";
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
