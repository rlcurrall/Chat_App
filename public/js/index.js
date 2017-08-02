// Create socket for connection with server
let socket = io();

// Indicate when user connects
socket.on('connect', function () {
  console.log('Connected to server!');
});

// Indicate when user disconnects
socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

// Display message recieved from server
socket.on('newMessage', function (message) {
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

// Display location link recievex from server
socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);

  jQuery('#messages').append(li);
});

// When form is submitted, don't reload page, send emit message
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});

// Define send-location button
let locationButton = jQuery('#send-location');

// When button clicked get latitude and longitude
locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (e) {
    alert('Unable to fetch location.');
  });
});
