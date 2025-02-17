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


