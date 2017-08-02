/* NODE MODULES */
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

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

  // Welcome new user to chat
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

  // Inform other users of new user
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

  // print message recieved from the client
  socket.on('createMessage', (message) => {
    console.log(message.from + ": " + message.text);
    io.emit('newMessage', generateMessage(message.from, message.text));
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
