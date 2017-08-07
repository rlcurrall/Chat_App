/* NODE MODULES */
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

/* IMPORTS */
const {Users} = require('./utils/users');
const {isRealString} = require('./utils/validation');
const {generateMessage, generateLocationMessage} = require('./utils/message');

/* GLOBAL VARIABLES */
const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000;

/* SERVER & SOCKET CONFIG */
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

// configure middleware
app.use(express.static(publicPath));

// SOCKET
io.on('connection', (socket) => {
  console.log('New user connected!');

  // User joins provided room
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    let checkName = params.name.toLowerCase();

    if (!users.isNameFree(checkName)) {
      return callback('Name is not available');
    }

    users.isNameFree(checkName);
    params.room = params.room.toLowerCase();

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback();
  });

  // Emit message recieved from user
  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text, message.color));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }

  });

  // notify when user disconnects from server
  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});

/* SET PORT LISTENER */
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
