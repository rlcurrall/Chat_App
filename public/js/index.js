
let socket = io();

socket.on('connect', function () {
  console.log('Connected to server!');

  // send message to the node server
  socket.emit('createMessage', {
    from: 'Mike',
    text: 'Sounds good!'
  })
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

// display message recieved from the node server
socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
