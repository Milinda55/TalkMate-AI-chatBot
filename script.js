document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("user-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") return;

    let userMessage = document.createElement("p");
    userMessage.className = "user-message";
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    let botMessage = document.createElement("p");
    botMessage.className = "bot-message";
    botMessage.textContent = "I'm still learning! 😊";
    chatBox.appendChild(botMessage);

    document.getElementById("user-input").value = "";

}

function appendMessage(role, message) {
    let chatBox = document.getElementById("chat-box");
    let messageContainer = document.createElement("div");
    messageContainer.className = `message-container ${role}-message-container`;

    // Add profile picture
    let profilePic = document.createElement("img");
    profilePic.className = `profile-pic ${role}-pic`;
    profilePic.src = role === "user" ? "" : "img/bot-image.jpg";
    profilePic.alt = role === "user" ? "" : "Bot";
    messageContainer.appendChild(profilePic);

    // Add message
    let messageDiv = document.createElement("p");
    messageDiv.className = `${role}-message`;
    messageDiv.textContent = message;
    messageContainer.appendChild(messageDiv);

    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}


