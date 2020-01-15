const moment = require('moment');
const io = require('socket.io-client');
const utils = require('./utils');

// Create socket for connection with server
let socket = io();

// Indicate when user connects
socket.on('connect', function() {
    const username = utils.getMeta('username');
    const room = utils.getMeta('room');

    socket.emit('chat.join.room', { username, room }, function(err) {
        if (err) {
            alert(err);
            location.assign('/');
        }
    });
});

socket.on('chat.update.users', function(users) {
    let ol = document.createElement('ol');

    users.forEach(function(user) {
        let li = document.createElement('li');
        li.innerText = user;
        ol.append(li);
    });

    let userList = document.querySelector('#users');
    userList.innerHTML = '';
    userList.append(ol);
});

// Display message received from server
socket.on('chat.new.message', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let html = utils.makeHTML('message-template', {
        from: message.from,
        text: message.text,
        color: message.color,
        createdAt: formattedTime,
    });

    document.querySelector('#messages').append(html);
    utils.scrollToBottom();
});

// Display location link received from server
socket.on('chat.new.message.location', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let html = utils.makeHTML('location-message-template', {
        from: message.from,
        url: message.url,
        createdAt: formattedTime,
    });

    document.querySelector('#messages').append(html);
    utils.scrollToBottom();
});

window.sendMessage = msg => {
    const username = utils.getMeta('username');
    const room = utils.getMeta('room');

    socket.emit('chat.post.message', {
        username,
        room,
        from: 'User',
        text: msg,
    });
};

window.sendLocationMessage = () => {
    console.log('hello');
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {
            const username = utils.getMeta('username');
            const room = utils.getMeta('room');

            socket.emit('chat.post.message.location', {
                username,
                room,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        },
        function() {
            alert('Unable to fetch location at this time.');
        },
    );
};
