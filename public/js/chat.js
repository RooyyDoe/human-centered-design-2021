// Help from: https://tutorialzine.com/2017/08/converting-from-speech-to-text-with-javascript

const socket = io();

const inputs = document.querySelectorAll('button')

const radioInputs = document.querySelectorAll('input[type="radio"]')

const comicRadioButton = document.getElementById('comic')
const normalRadioButton = document.getElementById('normal')

const normalEmotion = document.querySelector('.emotion-wrapper')
const comicEmotion = document.querySelector('.emotion-wrapper-comic')

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

const recordButton = document.getElementById('start-record-btn')
const pasteButton = document.getElementById('paste-record-btn')
const instructions = document.getElementById('recording-instructions')

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

let messageContent = '';

recognition.continuous = true;

// This block is called every time the Speech APi captures a line. 
recognition.onresult = function(event) {

  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far. 
  // We only need the current one.
  var current = event.resultIndex;

  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;

  // Add the current transcript to the contents of our Note.
  // There is a weird bug on mobile, where everything is repeated twice.
  // There is no official solution so far so we have to handle an edge case.
  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    messageContent += transcript
    message.value = messageContent
  }
};

recognition.onstart = function() { 
  instructions.textContent = 'Voice recognition activated. Try speaking into the microphone.'
}

recognition.onspeechend = function() {
  instructions.textContent = 'You were quiet for a while so voice recognition turned itself off.'
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.textContent = 'No speech was detected. Try again.'
  };
}

recordButton.addEventListener('click', () => {
    if (messageContent.length) {
        messageContent += ' ';
      }
    recognition.start();
})

pasteButton.addEventListener('click', () => {
    recognition.stop();

    if(!messageContent.length) {
      instructions.textContent = 'Could not save empty note. Please add a message to your note.'
    }
    else {
  
      // Reset variables and update UI.
      messageContent = '';
      message.value = ''
      instructions.textContent = 'Note saved successfully.'
    }
        
})


let name = prompt('What is your name?')
let timeout

if (name == undefined || name == '') {
    name = 'Guest';
}

comicRadioButton.addEventListener('click', () => {
    if(comicRadioButton.checked = true) {
        normalEmotion.style.display = 'none'
        comicEmotion.style.display = 'flex'
    } else {
        normalEmotion.style.display = 'flex'
        comicEmotion.style.display = 'none'
    }
})

normalRadioButton.addEventListener('click', () => {
    if(normalRadioButton.checked = true) {
        normalEmotion.style.display = 'flex'
        comicEmotion.style.display = 'none'
    } else {
        normalEmotion.style.display = 'none'
        comicEmotion.style.display = 'flex'
    }
})

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
    } else if(emotion === 'comic-angry') {
        comicAngryMessage(message, 'own-message')
    } else if(emotion === 'comic-neutral') {
        comicNeutralMessage(message, 'own-message')
    } else if(emotion === 'comic-anxious') {
        comicAnxiousMessage(message, 'own-message')
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
    } else if(emotion === 'comic-angry') {
        comicAngryMessage(message, 'their-message')
    } else if(emotion === 'comic-neutral') {
        comicNeutralMessage(message, 'their-message')
    } else if(emotion === 'comic-anxious') {
        comicAnxiousMessage(message, 'their-message')
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

const comicAngryMessage = (message, style) => {

    const messageElement = document.createElement('div')
    const newMessage = document.createElement('p')

    messageElement.classList.add('message-output')
    messageElement.classList.add(style);
    
    newMessage.innerText = message

    messageElement.classList.add('comic-angry')
    messageElement.classList.add('animate__animated', 'animate__zoomIn');
    messageElement.style.setProperty('--animate-duration', '.2s');
    newMessage.classList.add('new-message')

    if(message) {
        output.append(messageElement)
        messageElement.append(newMessage)
    }

    messageInput.value = ''
    scrollDown()
}

const comicNeutralMessage = (message, style) => {

    const messageElement = document.createElement('div')
    const newMessage = document.createElement('p')

    messageElement.classList.add('message-output')
    messageElement.classList.add(style);
    
    newMessage.innerText = message

    messageElement.classList.add('comic-neutral')
    messageElement.classList.add('animate__animated', 'animate__zoomIn');
    messageElement.style.setProperty('--animate-duration', '.2s');
    newMessage.classList.add('new-message')

    if(message) {
        output.append(messageElement)
        messageElement.append(newMessage)
    }

    messageInput.value = ''
    scrollDown()
}

const comicAnxiousMessage = (message, style) => {

    const messageElement = document.createElement('div')
    const newMessage = document.createElement('p')

    messageElement.classList.add('message-output')
    messageElement.classList.add(style);
    
    newMessage.innerText = message

    messageElement.classList.add('comic-anxious')
    messageElement.classList.add('animate__animated', 'animate__zoomIn');
    messageElement.style.setProperty('--animate-duration', '.2s');
    newMessage.classList.add('new-message')

    if(message) {
        output.append(messageElement)
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

        } else if(input.value === 'comic-angry') {

            const message = messageInput.value
            socket.emit('send-message', message, input.value)
            messageInput.value = ''

        } else if(input.value === 'comic-neutral') {

            const message = messageInput.value
            socket.emit('send-message', message, input.value)
            messageInput.value = ''

        } else if(input.value === 'comic-anxious') {

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
