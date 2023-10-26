const chatMessages = document.getElementById('chatMessages');
const messageForm = document.getElementById('messageForm');

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value;
    await fetch('/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    });
    document.getElementById('message').value = '';
});

async function getMessages() {
    const response = await fetch('/messages');
    const messages = await response.json();
    chatMessages.innerHTML = messages.map(msg => `<p>${msg}</p>`).join('');
}

getMessages();
setInterval(getMessages, 1000); // Refresh messages every second
