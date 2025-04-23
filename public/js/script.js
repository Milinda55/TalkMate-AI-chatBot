const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

const darkModeToggle = document.getElementById('dark-mode-toggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
htmlElement.setAttribute('data-theme', savedTheme);

if (savedTheme === 'dark') {
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

darkModeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    darkModeToggle.innerHTML = newTheme === 'dark'
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
});


async function getAIResponse(userMessage) {
    const API_URL = '/api/chatbot';
    console.log(`[DEBUG] Calling ${API_URL} with message:`, userMessage);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userMessage }),
            signal: AbortSignal.timeout(15000) // Increased timeout
        });

        console.log("[DEBUG] Response status:", response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorText = await response.text().catch(() => "Unknown error");
            console.error("API Error:", response.status, errorData || errorText);
            throw new Error(`API request failed: ${errorData?.error || errorText}`);
        }

        const data = await response.json();
        return data.generated_text || "No response from AI";

    } catch (error) {
        console.error("Detailed Error:", error);
        throw error;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const chatBox = document.getElementById("chat-box");

    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") sendMessage();
    });
    sendBtn.addEventListener("click", sendMessage);
});

async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();

    if (!message) return;

    appendMessage("user", message);
    userInput.value = "";

    const loadingId = "loading-" + Date.now();
    showLoadingIndicator(loadingId);

    try {
        const botReply = await getAIResponse(message);
        removeLoadingIndicator(loadingId);
        appendMessage("bot", botReply);

    } catch (error) {
        removeLoadingIndicator(loadingId);
        handleError(error);
    }
}

function appendMessage(role, message) {
    const chatBox = document.getElementById("chat-box");
    const messageContainer = document.createElement("div");
    messageContainer.className = `message-container ${role}-message-container`;

    const profilePic = document.createElement("img");
    profilePic.className = `profile-pic ${role}-pic`;
    profilePic.src = role === "user" ? "./img/milley.png" : "./img/bot-image.jpg";
    profilePic.alt = role === "user" ? "User" : "AI Bot";

    const messageDiv = document.createElement("p");
    messageDiv.className = `${role}-message`;
    messageDiv.textContent = message;

    messageContainer.appendChild(profilePic);
    messageContainer.appendChild(messageDiv);
    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showLoadingIndicator(id) {
    const chatBox = document.getElementById("chat-box");
    const loadingDiv = document.createElement("div");
    loadingDiv.id = id;
    loadingDiv.className = "message-container bot-message-container";
    loadingDiv.innerHTML = `
    <img src="/img/bot-image.jpg" alt="Bot" class="profile-pic bot-pic">
    <p class="bot-message loading-dots">Thinking<span class="dot"></span><span class="dot"></span><span class="dot"></span></p>
`;

    chatBox.appendChild(loadingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeLoadingIndicator(id) {
    const loadingElement = document.getElementById(id);
    if (loadingElement) {
        loadingElement.remove();
    }
}

function handleError(error) {
    let errorMessage = "Sorry, I'm having trouble connecting to the AI. Please try again later.";

    if (error.message.includes("Failed to fetch")) {
        errorMessage = "Connection to server failed. Please check your internet connection.";
    } else if (error.message.includes("404")) {
        errorMessage = "The AI service is currently unavailable. Please try again later.";
    } else if (error.message.includes("AI returned an empty response")) {
        errorMessage = "The AI didn't respond. Maybe try rephrasing your question?";
    } else if (error.message) {
        errorMessage = error.message;
    }

    console.error("Error details:", error);
    appendMessage("bot", errorMessage);
}

window.debugAPI = async function(testMessage = "Hello") {
    console.log("Testing API with message:", testMessage);
    try {
        const response = await getAIResponse(testMessage);
        console.log("API Test Success:", response);
        return response;
    } catch (error) {
        console.error("API Test Failed:", error);
        throw error;
    }
};