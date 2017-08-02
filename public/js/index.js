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
  console.log(message.from + ": " + message.text);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
