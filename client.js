const socket = io(https://christian0015.github.io/serveur/);

const username = prompt('Entrez votre nom d\'utilisateur :');
socket.emit('user-connected', username);

const userList = document.getElementById('users');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

socket.on('update-user-list', (usernames) => {
    userList.innerHTML = '';
    usernames.forEach((user) => {
        const li = document.createElement('li');
        li.textContent = user;
        userList.appendChild(li);
    });
});

sendButton.addEventListener('click', () => {
    const to = prompt('Entrez le nom de l\'utilisateur avec lequel vous voulez communiquer :');
    const message = messageInput.value;
    socket.emit('send-message', { to, message });
    messageInput.value = '';
});

socket.on('message', (data) => {
    const message = document.createElement('li');
    message.textContent = `${data.from}: ${data.message}`;
    messages.appendChild(message);
});
