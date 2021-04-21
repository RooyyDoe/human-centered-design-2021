const socket = io();

const inputs = document.querySelectorAll('input[type=radio]')

const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message')
const btn = document.getElementById('send-button')
const output = document.getElementById('message-output-list')
const feedback = document.getElementById('new-feedback')

let name = prompt('What is your name?')
let timeout

if (name === undefined || name === '') {
    name = 'Guest';
}

// appendMessage('You joined', 'join')

socket.emit('new-user', name)


socket.on('own-chat-message', message => {
    feedback.innerText = ''
    appendMessage(`${message}`)
})

// socket.on('their-chat-message', data => {
//     feedback.innerText = ''
//     appendMessage(`${data.name}: ${data.message}`, 'their-message')
// })

// socket.on('user-connected', name => {
//     appendMessage(`Say hello to ${name}`, 'connect')
// })

// socket.on('user-disconnected', name => {
//     console.log('false?', name)
//     appendMessage(`${name} left the server`, 'disconnect')
// })

// socket.on('someone-is-typing', name => {
//     if (name) {
//         feedback.innerText = `${name} is typing a message...`
//         console.log('test')
//     } else {
//         feedback.innerText = ''
//     }
// })

messageForm.addEventListener('submit', event => {
    event.preventDefault()
    const message = messageInput.value
    socket.emit('send-message', message)
    messageInput.value = ''
})

// messageInput.addEventListener('keypress', () => {
//     socket.emit('typing-message', name)
//     clearTimeout(timeout)
//     timeout = setTimeout(timeoutFunction, 1000)
// })

// function timeoutFunction() {
//     socket.emit("typing-message", false);
// }

function appendMessage(message) {

    const messageElement = document.createElement('div')
    const newMessage = document.createElement('p')
    const emotionMessage = document.createElement('p')

    messageElement.classList.add('message-output')

    if(document.getElementById('happy').checked) {

        emotionMessage.textContent = name + 'Feels happy 😁'
        newMessage.classList.add('new-message')

    } else if (document.getElementById('angry').checked) {

        emotionMessage.textContent = 'Feels angry 😠'
        newMessage.classList.add('new-message')

    } else if (document.getElementById('excitement').checked) {

        emotionMessage.textContent = 'Feels excited 😬'
        newMessage.classList.add('new-message')

    } else if (document.getElementById('desire').checked) {

        emotionMessage.textContent = 'has desired feelings 😌'
        newMessage.classList.add('new-message')

    } else if (document.getElementById('neutral').checked) {

        emotionMessage.textContent = 'Feels normal 😊'
        newMessage.classList.add('new-message')

    } else if (document.getElementById('sad').checked) {
        
        emotionMessage.textContent = 'Feels sad 😔'
        newMessage.classList.add('new-message')

    } else if (document.getElementById('fear').checked) 
    {
        emotionMessage.textContent = 'Feels feared 😨'
        newMessage.classList.add('new-message')

    } else if (document.getElementById('disgust').checked) {

        emotionMessage.textContent = 'Feels disgusted 🤮'
        newMessage.classList.add('new-message')

    } else if (document.getElementById('confused').checked) {

        emotionMessage.textContent = 'Feels confused 😲'
        newMessage.classList.add('new-message')

    }

    newMessage.innerText = message

    output.append(messageElement, emotionMessage)
    messageElement.append(newMessage)
    scrollDown()
}

function scrollDown() {
    //https://exceptionshub.com/scroll-automatically-to-the-bottom-of-the-page.html
    window.scrollTo(0, document.body.scrollHeight);
}