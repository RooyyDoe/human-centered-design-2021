const socket = io();

const inputs = document.querySelectorAll('input[type=radio]')

const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message')
const btn = document.getElementById('send-button')
const output = document.getElementById('message-output-list')
const feedback = document.getElementById('new-feedback')

console.log('wtf')

let name = prompt('What is your name?')
let timeout

if (name == undefined || name == '') {
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

    messageElement.classList.add('message-output')

    if(document.getElementById('happy').checked) {

        messageElement.classList.add('animate__animated', 'animate__jello');
        newMessage.classList.add('new-message')

    } else if (document.getElementById('angry').checked) {

        messageElement.classList.add('animate__animated', 'animate__shakeY');
        newMessage.classList.add('new-message')

    } else if (document.getElementById('excitement').checked) {

        messageElement.classList.add('animate__animated', 'animate__tada');
        newMessage.classList.add('new-message')

    } else if (document.getElementById('desire').checked) {

        messageElement.classList.add('animate__animated', 'animate__heartBeat');
        newMessage.classList.add('new-message')

    } else if (document.getElementById('neutral').checked) {

        messageElement.classList.add('animate__animated', 'animate__fadeIn');
        newMessage.classList.add('new-message')

    } else if (document.getElementById('sad').checked) {
        
        messageElement.classList.add('animate__animated', 'animate__slideInLeft');
        messageElement.style.setProperty('--animate-duration', '2.5s');
        newMessage.classList.add('new-message')

    } else if (document.getElementById('fear').checked) 
    {
        messageElement.classList.add('animate__animated', 'animate__flash');
        messageElement.style.setProperty('--animate-duration', '2s');
        newMessage.classList.add('new-message')

    } else if (document.getElementById('disgust').checked) {

        messageElement.classList.add('animate__animated', 'animate__shakeX');
        newMessage.classList.add('new-message')

    } else if (document.getElementById('confused').checked) {

        messageElement.classList.add('animate__animated', 'animate__wobble');
        newMessage.classList.add('new-message')

    }

    newMessage.innerText = message

    output.append(messageElement)
    messageElement.append(newMessage)
    scrollDown()
}

function scrollDown() {
    //https://exceptionshub.com/scroll-automatically-to-the-bottom-of-the-page.html
    window.scrollTo(0, document.body.scrollHeight);
}