/* NODE MODULES */
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

/* GLOBAL VARIABLES */
const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000;

/* EXPRESS SERVER */
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

// configure middleware
app.use(express.static(publicPath));

// io stuff
io.on('connection', (socket) => {
  console.log('New user connected!');

  // send message to the client
  socket.emit('newMessage', {
    from: 'Robb',
    text: 'Hey, can you meet up at 6?',
    createdAt: new Date()
  });

  // print message recieved from the client
  socket.on('createMessage', (message) => {
    message.createdAt = new Date();
    console.log('createMessage', message);
  });

  // notify when user disconnects from server
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

// set port for app
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
