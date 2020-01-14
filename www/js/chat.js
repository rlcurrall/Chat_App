const $ = require('jquery');
const moment = require('moment');
const mustache = require('mustache');
const io = require('socket.io-client');

// Create socket for connection with server
let socket = io();

function getMeta(metaName) {
    const metas = document.getElementsByTagName('meta');

    for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('name') === metaName) {
            return metas[i].getAttribute('content');
        }
    }

    return null;
}

// Auto-scroll page
function scrollToBottom() {
    // Selectors
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');

    // Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (
        clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
        scrollHeight
    ) {
        messages.scrollTop(scrollHeight);
    }
}

// Indicate when user connects
socket.on('connect', function() {
    const name = getMeta('username');
    const room = getMeta('room');

    socket.emit('room.join', { name, room }, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

// Indicate when user disconnects
socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});

socket.on('user-list.update', function(users) {
    console.log('users:', users);
    let ol = $('<ol></ol');

    users.forEach(function(user) {
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
});

socket.on('user-list.update', function(users) {
    console.log('Users list', users);
});

// Display message received from server
socket.on('message.new', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#message-template').html();
    let html = mustache.render(template, {
        from: message.from,
        text: message.text,
        color: message.color,
        createdAt: formattedTime,
    });

    $('#messages').append(html);
    scrollToBottom();
});

// Display location link received from server
socket.on('message.new.location', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#location-message-template').html();
    let html = mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime,
    });

    $('#messages').append(html);
    scrollToBottom();
});

let messageTextBox = $('[name=message]');

// When form is submitted, don't reload page, send emit message
$('#message-form').on('submit', function(e) {
    const username = getMeta('username');
    const room = getMeta('room');

    e.preventDefault();
    socket.emit(
        'message.post',
        {
            username,
            room,
            from: 'User',
            text: messageTextBox.val(),
            // color: userColor,
        },
        function() {
            messageTextBox.val('');
        },
    );
});

// Define send-location button
let locationButton = $('#send-location');

// When button clicked get latitude and longitude
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(
        function(position) {
            const username = getMeta('username');
            const room = getMeta('room');
            locationButton.removeAttr('disabled').text('Send Location');

            socket.emit('message.post.location', {
                username,
                room,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        },
        function() {
            locationButton.removeAttr('disabled').text('Send Location');

            alert('Unable to fetch location at this time.');
        },
    );
});
