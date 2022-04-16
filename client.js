console.log("client js connected go")
const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('sounds/msgaudio.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'right') {
        audio.play();
    }
    
    
    
}

const name = prompt("enter your name to join");
socket.emit('new-user-joined',name);


socket.on('user-joined', name => {
    append( `${name} joined the chat `,`right`)
})
socket.on('receive', data => {
    append( `${data.name}:${data.message}`,`right`)
})




const chatbot = {
  hey: "hi good day",
  hi: "hi how can i help you",
  joke: "sorry no joke",
    programming: "which language you want to learn",
    webdev: "html,css,javascript for frontend django nodejs for backend",
    datascience: "python, R for data science",
    coding: "well first you need to select a language",
    datastructure: "its adanced topic you learn after you have learned a programming language",
    algorithm:"its step by step procedure to get desired output",
    bye: "bye hope you got answers",
   joke:"why scientist don't trust atom:because they make eveything"
  
};










form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
   
    if (message == 'hi') {
        append(`chatbot : hi user what i can do`, `left`);
    }
    else if (message == 'help') {
        append(`chatbot : please contact on this no`, `left`);
    }
    else if (message == 'play a song') {
        append(`chatbot : playing violin`, `left`);
        let audio = new Audio('sounds/whbotsong.mp3');
        audio.play();
    }
        
    else if (message == 'tyb') {
        append(`chatbot : playing tyb`, `left`);
        let tyb = new Audio('sounds/tyb.mp3');
        tyb.play();
    }
        
    else {
        append(`You : ${message}`, `left`);
    }
     for (let x in chatbot) {
       console.log("for loop");
       console.log(message);
       if (x == message) {
         append(`chatbot : ${chatbot[x]}`, `right`);
         console.log(chatbot[x]);
       }
     }
    socket.emit('send', message)
    messageInput.value = ''

})
socket.on("left", (name) => {
  append(`${name} left the chat `, `right`);
});

