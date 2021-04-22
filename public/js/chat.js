const socket = io();

const inputs = document.querySelectorAll('button')

const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message')
const btn = document.getElementById('send-button')
const output = document.getElementById('message-output-list')
const feedback = document.getElementById('new-feedback')

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

messageInput.addEventListener('keyup', (event) => {

    const messageElement = document.createElement('div')
    const newMessage = document.createElement('p')
    const emotionMessage = document.createElement('p')

    messageElement.classList.add('message-output')

    event.preventDefault();
    if (event.keyCode === 13) {

        const message = messageInput.value
        newMessage.innerText = message

        messageElement.classList.add('neutral')
        emotionMessage.textContent = name + ' is feeling normal 😊'
        messageElement.classList.add('animate__animated', 'animate__zoomIn');
        messageElement.style.setProperty('--animate-duration', '.2s');
        newMessage.classList.add('new-message')

        if(message) {
            output.append(messageElement, emotionMessage)
            messageElement.append(newMessage)
        }

        messageInput.value = ''
        scrollDown()
    }
})

inputs.forEach(input => {
    input.addEventListener('click', event => {
        event.preventDefault()

        // const userName = name

        // console.log(userName)

        const messageElement = document.createElement('div')
        const newMessage = document.createElement('p')
        const emotionMessage = document.createElement('p')

        messageElement.classList.add('message-output')

        if(input.value === 'happy') {
            const message = messageInput.value
            newMessage.innerText = message

            messageElement.classList.add('happy')
            emotionMessage.textContent = name + ' is feeling happy 😁'
            messageElement.classList.add('animate__animated', 'animate__bounceIn');
            newMessage.classList.add('new-message')

            if(message) {
                output.append(messageElement, emotionMessage)
                messageElement.append(newMessage)
            }

            messageInput.value = ''
            scrollDown()
        } else if(input.value === 'angry') {
            const message = messageInput.value
            newMessage.innerText = message

            messageElement.classList.add('angry')
            emotionMessage.textContent = name + ' is feeling angry 😠'
            messageElement.classList.add('animate__animated', 'animate__shakeY');
            newMessage.classList.add('new-message')

            if(message) {
                output.append(messageElement, emotionMessage)
                messageElement.append(newMessage)
            }

            messageInput.value = ''
            scrollDown()
        } else if(input.value === 'excitement') {
            const message = messageInput.value
            newMessage.innerText = message

            messageElement.classList.add('excitement')
            emotionMessage.textContent = name + ' is feeling excited 😬'
            messageElement.classList.add('animate__animated', 'animate__tada');
            newMessage.classList.add('new-message')

            if(message) {
                output.append(messageElement, emotionMessage)
                messageElement.append(newMessage)
            }

            messageInput.value = ''
            scrollDown()
        } 
        // else if(input.value === 'neutral') {
        //     const message = messageInput.value
        //     newMessage.innerText = message

        //     messageElement.classList.add('neutral')
        //     emotionMessage.textContent = name + ' is feeling normal 😊'
        //     messageElement.classList.add('animate__animated', 'animate__zoomIn');
        //     messageElement.style.setProperty('--animate-duration', '.2s');
        //     newMessage.classList.add('new-message')

        //     if(message) {
        //         output.append(messageElement, emotionMessage)
        //         messageElement.append(newMessage)
        //     }

        //     messageInput.value = ''
        //     scrollDown()
        // } 
        else if(input.value === 'sad') {
            const message = messageInput.value
            newMessage.innerText = message

            messageElement.classList.add('sad')
            emotionMessage.textContent = name + ' is feeling sad 😔'
            messageElement.classList.add('animate__animated', 'animate__fadeIn');
            messageElement.style.setProperty('--animate-duration', '3s');
            newMessage.classList.add('new-message')
            
            if(message) {
                output.append(messageElement, emotionMessage)
                messageElement.append(newMessage)
            }

            messageInput.value = ''
            scrollDown()
        } else if(input.value === 'anxious') {
            const message = messageInput.value
            newMessage.innerText = message

            messageElement.classList.add('anxious')
            emotionMessage.textContent = name + ' is feeling anxious 😨'
            messageElement.classList.add('animate__animated', 'animate__flash');
            messageElement.style.setProperty('--animate-duration', '2s');
            newMessage.classList.add('new-message')

            if(message) {
                output.append(messageElement, emotionMessage)
                messageElement.append(newMessage)
            }

            messageInput.value = ''
            scrollDown()
        } else if(input.value === 'disgust') {
            const message = messageInput.value
            newMessage.innerText = message

            messageElement.classList.add('disgust')
            emotionMessage.textContent = name + ' is feeling disgusted 🤮'
            messageElement.classList.add('animate__animated', 'animate__swing');
            newMessage.classList.add('new-message')

            if(message) {
                output.append(messageElement, emotionMessage)
                messageElement.append(newMessage)
            }

            messageInput.value = ''
            scrollDown()
        } else if(input.value === 'confused') {
            const message = messageInput.value
            newMessage.innerText = message

            messageElement.classList.add('confused')
            emotionMessage.textContent = name + ' is feeling confused 😲'
            messageElement.classList.add('animate__animated', 'animate__shakeX');
            newMessage.classList.add('new-message')

            if(message) {
                output.append(messageElement, emotionMessage)
                messageElement.append(newMessage)
            }

            messageInput.value = ''
            scrollDown()
        }
    })
})

function scrollDown() {
    //https://exceptionshub.com/scroll-automatically-to-the-bottom-of-the-page.html
    window.scrollTo(0, document.body.scrollHeight);
}
