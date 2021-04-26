const socket = io();

const inputs = document.querySelectorAll('button')

const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message')
const btn = document.getElementById('send-button')
const output = document.getElementById('message-output-list')
const feedback = document.getElementById('new-feedback')

const happyButton = document.getElementById('happy')
const happyHover = document.querySelector('.tooltip-message-output-happy')

const angryButton = document.getElementById('angry')
const angryHover = document.querySelector('.tooltip-message-output-angry')

const anxiousButton = document.getElementById('anxious')
const anxiousHover = document.querySelector('.tooltip-message-output-anxious')

const sadButton = document.getElementById('sad')
const sadHover = document.querySelector('.tooltip-message-output-sad')

const confusedButton = document.getElementById('confused')
const confusedHover = document.querySelector('.tooltip-message-output-confused')

const excitementButton = document.getElementById('excitement')
const excitementHover = document.querySelector('.tooltip-message-output-excitement')

const disgustButton = document.getElementById('disgust')
const disgustHover = document.querySelector('.tooltip-message-output-disgust')

console.log(happyHover, happyButton)

let name = prompt('What is your name?')
let timeout

if (name == undefined || name == '') {
    name = 'Guest';
}

happyButton.addEventListener('mouseenter', () => {
    happyHover.classList.add('animate__animated', 'animate__bounceIn');
    
    setTimeout(() => {
        happyHover.classList.remove('animate__animated', 'animate__bounceIn');
    }, 2000);
})

angryButton.addEventListener('mouseenter', () => {
    angryHover.classList.add('animate__animated', 'animate__shakeY');
    
    setTimeout(() => {
        angryHover.classList.remove('animate__animated', 'animate__shakeY');
    }, 2000);
})

anxiousButton.addEventListener('mouseenter', () => {
    anxiousHover.classList.add('animate__animated', 'animate__flash');
    anxiousHover.style.setProperty('--animate-duration', '2s');
    
    setTimeout(() => {
        anxiousHover.classList.remove('animate__animated', 'animate__flash');
    }, 2000);
})

sadButton.addEventListener('mouseenter', () => {
    sadHover.classList.add('animate__animated', 'animate__fadeIn');
    sadHover.style.setProperty('--animate-duration', '3s');
    
    setTimeout(() => {
        sadHover.classList.remove('animate__animated', 'animate__fadeIn');
    }, 2000);
})

confusedButton.addEventListener('mouseenter', () => {
    confusedHover.classList.add('animate__animated', 'animate__shakeX');
    
    setTimeout(() => {
        confusedHover.classList.remove('animate__animated', 'animate__shakeX');
    }, 2000);
})

excitementButton.addEventListener('mouseenter', () => {
    excitementHover.classList.add('animate__animated', 'animate__tada');
    
    setTimeout(() => {
        excitementHover.classList.remove('animate__animated', 'animate__tada');
    }, 2000);
})

disgustButton.addEventListener('mouseenter', () => {
    disgustHover.classList.add('animate__animated', 'animate__swing');
    
    setTimeout(() => {
        disgustHover.classList.remove('animate__animated', 'animate__swing');
    }, 2000);
})

socket.emit('new-user', name)


socket.on('own-chat-message', (message, name, emotion) => {
    feedback.innerText = ''
    if(emotion === 'happy') {
        happyMessage(message, name, 'own-message')
    } else if(emotion === 'angry') {
        angryMessage(message, name, 'own-message')
    } else if(emotion === 'anxious') {
        anxiousMessage(message, name, 'own-message')
    } else if(emotion === 'sad') {
        sadMessage(message, name, 'own-message')
    } else if(emotion === 'confused') {
        confusedMessage(message, name, 'own-message')
    } else if(emotion === 'excitement') {
        excitementMessage(message, name, 'own-message')
    } else if(emotion === 'disgust') {
        disgustMessage(message, name, 'own-message')
    } else {
        normalMessage(message, name, 'own-message')
    }
})

socket.on('their-chat-message', (message, name, emotion) => {
    feedback.innerText = ''
    if(emotion === 'happy') {
        happyMessage(message, name, 'their-message')
    } else if(emotion === 'angry') {
        angryMessage(message, name, 'their-message')
    } else if(emotion === 'anxious') {
        anxiousMessage(message, name, 'their-message')
    } else if(emotion === 'sad') {
        sadMessage(message, name, 'their-message')
    } else if(emotion === 'confused') {
        confusedMessage(message, name, 'their-message')
    } else if(emotion === 'excitement') {
        excitementMessage(message, name, 'their-message')
    } else if(emotion === 'disgust') {
        disgustMessage(message, name, 'their-message')
    } else {
        normalMessage(message, name)
    }
})

// socket.on('user-connected', name => {
//     appendMessage(`Say hello to ${name}`, 'connect')
// })

// socket.on('user-disconnected', name => {
//     console.log('false?', name)
//     appendMessage(`${name} left the server`, 'disconnect')
// })

messageInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        const message = messageInput.value
        socket.emit('send-message', message)
        messageInput.value = ''
    }
})

const normalMessage = (message, username, style) => {

    const messageElement = document.createElement('div')
    const newMessage = document.createElement('p')
    const emotionMessage = document.createElement('p')

    if (style === 'own-message') {
        emotionMessage.style.textAlign = "right"
    } else {
        emotionMessage.style.textAlign = "left"
    }

    messageElement.classList.add('message-output')
    messageElement.classList.add(style);

    newMessage.innerText = message

    messageElement.classList.add('neutral')
    emotionMessage.textContent = username + ' is feeling neutral 😐'
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

const happyMessage = (message, username, style) => {

    const messageElement = document.createElement('div')
    const newMessage = document.createElement('p')
    const emotionMessage = document.createElement('p')

    if (style === 'own-message') {
        emotionMessage.style.textAlign = "right"
    } else {
        emotionMessage.style.textAlign = "left"
    }

    messageElement.classList.add('message-output')
    messageElement.classList.add(style);

    newMessage.innerText = message

    messageElement.classList.add('happy')
    emotionMessage.textContent = username + ' is feeling happy 😁'
    messageElement.classList.add('animate__animated', 'animate__bounceIn');
    newMessage.classList.add('new-message')

    if(message) {
        output.append(messageElement, emotionMessage)
        messageElement.append(newMessage)
    }

    messageInput.value = ''
    scrollDown()
}

const angryMessage = (message, username, style) => {

    const messageElement = document.createElement('div')
    const newMessage = document.createElement('p')
    const emotionMessage = document.createElement('p')

    if (style === 'own-message') {
        emotionMessage.style.textAlign = "right"
    } else {
        emotionMessage.style.textAlign = "left"
    }

    messageElement.classList.add('message-output')
    messageElement.classList.add(style);

    newMessage.innerText = message

    messageElement.classList.add('angry')
    emotionMessage.textContent = username + ' is feeling angry 😠'
    messageElement.classList.add('animate__animated', 'animate__shakeY');
    newMessage.classList.add('new-message')

    if(message) {
        output.append(messageElement, emotionMessage)
        messageElement.append(newMessage)
    }

    messageInput.value = ''
    scrollDown()
}

const anxiousMessage = (message, username, style) => {

    const messageElement = document.createElement('div')
    const newMessage = document.createElement('p')
    const emotionMessage = document.createElement('p')

    if (style === 'own-message') {
        emotionMessage.style.textAlign = "right"
    } else {
        emotionMessage.style.textAlign = "left"
    }

    messageElement.classList.add('message-output')
    messageElement.classList.add(style);

    newMessage.innerText = message

    messageElement.classList.add('anxious')
    emotionMessage.textContent = username + ' is feeling anxious 😨'
    messageElement.classList.add('animate__animated', 'animate__flash');
    messageElement.style.setProperty('--animate-duration', '2s');
    newMessage.classList.add('new-message')

    if(message) {
        output.append(messageElement, emotionMessage)
        messageElement.append(newMessage)
    }

    messageInput.value = ''
    scrollDown()
}

const sadMessage = (message, username, style) => {

    const messageElement = document.createElement('div')
    const newMessage = document.createElement('p')
    const emotionMessage = document.createElement('p')

    if (style === 'own-message') {
        emotionMessage.style.textAlign = "right"
    } else {
        emotionMessage.style.textAlign = "left"
    }

    messageElement.classList.add('message-output')
    messageElement.classList.add(style);

    newMessage.innerText = message

    messageElement.classList.add('sad')
    emotionMessage.textContent = username + ' is feeling sad 😔'
    messageElement.classList.add('animate__animated', 'animate__fadeIn');
    messageElement.style.setProperty('--animate-duration', '3s');
    newMessage.classList.add('new-message')
    
    if(message) {
        output.append(messageElement, emotionMessage)
        messageElement.append(newMessage)
    }

    messageInput.value = ''
    scrollDown()
}

const confusedMessage = (message, username, style) => {

    const messageElement = document.createElement('div')
    const newMessage = document.createElement('p')
    const emotionMessage = document.createElement('p')

    if (style === 'own-message') {
        emotionMessage.style.textAlign = "right"
    } else {
        emotionMessage.style.textAlign = "left"
    }

    messageElement.classList.add('message-output')
    messageElement.classList.add(style);

    newMessage.innerText = message

    messageElement.classList.add('confused')
    emotionMessage.textContent = username + ' is feeling confused 😲'
    messageElement.classList.add('animate__animated', 'animate__shakeX');
    newMessage.classList.add('new-message')

    if(message) {
        output.append(messageElement, emotionMessage)
        messageElement.append(newMessage)
    }

    messageInput.value = ''
    scrollDown()
}

const excitementMessage = (message, username, style) => {

    const messageElement = document.createElement('div')
    const newMessage = document.createElement('p')
    const emotionMessage = document.createElement('p')

    if (style === 'own-message') {
        emotionMessage.style.textAlign = "right"
    } else {
        emotionMessage.style.textAlign = "left"
    }

    messageElement.classList.add('message-output')
    messageElement.classList.add(style);

    newMessage.innerText = message

    messageElement.classList.add('excitement')
    emotionMessage.textContent = username + ' is feeling excited 😬'
    messageElement.classList.add('animate__animated', 'animate__tada');
    newMessage.classList.add('new-message')

    if(message) {
        output.append(messageElement, emotionMessage)
        messageElement.append(newMessage)
    }

    messageInput.value = ''
    scrollDown()
}

const disgustMessage = (message, username, style) => {

    const messageElement = document.createElement('div')
    const newMessage = document.createElement('p')
    const emotionMessage = document.createElement('p')

    if (style === 'own-message') {
        emotionMessage.style.textAlign = "right"
    } else {
        emotionMessage.style.textAlign = "left"
    }

    messageElement.classList.add('message-output')
    messageElement.classList.add(style);

    newMessage.innerText = message

    messageElement.classList.add('disgust')
    emotionMessage.textContent = username + ' is feeling disgusted 🤮'
    messageElement.classList.add('animate__animated', 'animate__swing');
    newMessage.classList.add('new-message')

    if(message) {
        output.append(messageElement, emotionMessage)
        messageElement.append(newMessage)
    }

    messageInput.value = ''
    scrollDown()
}


inputs.forEach(input => {
    input.addEventListener('click', event => {
        event.preventDefault()

        if(input.value === 'happy') {

            const message = messageInput.value
            socket.emit('send-message', message, input.value)
            messageInput.value = ''
            
        } else if(input.value === 'angry') {

            const message = messageInput.value
            socket.emit('send-message', message, input.value)
            messageInput.value = ''

        } else if(input.value === 'excitement') {

            const message = messageInput.value
            socket.emit('send-message', message, input.value)
            messageInput.value = ''

        } else if(input.value === 'sad') {

            const message = messageInput.value
            socket.emit('send-message', message, input.value)
            messageInput.value = ''

        } else if(input.value === 'anxious') {

            const message = messageInput.value
            socket.emit('send-message', message, input.value)
            messageInput.value = ''

        } else if(input.value === 'disgust') {

            const message = messageInput.value
            socket.emit('send-message', message, input.value)
            messageInput.value = ''

        } else if(input.value === 'confused') {

            const message = messageInput.value
            socket.emit('send-message', message, input.value)
            messageInput.value = ''

        }
    })
})

function scrollDown() {
    //https://exceptionshub.com/scroll-automatically-to-the-bottom-of-the-page.html
    window.scrollTo(0, document.body.scrollHeight);
}
