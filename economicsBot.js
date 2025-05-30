const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');

// Function to show message
function addMessage(message, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  messageDiv.textContent = message;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight; // auto-scroll
}

// Handle Send Button
async function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  // Show user message
  addMessage(input, 'user');
  userInput.value = '';

  try {
    // Send request to backend
    const res = await fetch('/api/economics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input })
    });

    const data = await res.json();
    const reply = data.answer || "Sorry, I couldn't find that answer.";
    addMessage(reply, 'bot');
  } catch (err) {
    console.error('Error:', err);
    addMessage("🚫 Error reaching AI Assistant. Please try again later.", 'bot');
  }
}
