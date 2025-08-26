const chatForm = document.getElementById('chat-form');
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');

function appendMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-message', sender);
  messageDiv.textContent = message;
  chatLog.appendChild(messageDiv);
  chatLog.scrollTop = chatLog.scrollHeight;
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage('user', message);
  userInput.value = '';

  appendMessage('bot', 'Typing...');

  try {
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    chatLog.lastChild.remove(); // Remove 'Typing...'
    appendMessage('bot', data.reply || "Sorry, I didn't get that.");
  } catch (err) {
    console.error('Error:', err);
    chatLog.lastChild.remove();
    appendMessage('bot', '⚠️ Could not connect to AI.');
  }
}

);
