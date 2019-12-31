/* NODE MODULES */
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

/* IMPORTS */
const { Users } = require('./utils/users');
const { isRealString } = require('./utils/validation');
const { generateMessage, generateLocationMessage } = require('./utils/message');

/* GLOBAL VARIABLES */
const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000;

/* SERVER & SOCKET CONFIG */
let app = express();
let server = http.createServer(app);
let io = socketio(server);
let users = new Users();

// configure middleware
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'views/index.html')),
);
app.get('/chat', (req, res) =>
    res.sendFile(path.join(__dirname, 'views/chat.html')),
);
app.use(express.static(publicPath));

// SOCKET
io.on('connection', socket => {
    console.log('New user connected!');

    // User joins provided room
    socket.on('join', ({ name, room }, callback) => {
        if (!isRealString(name) || !isRealString(room)) {
            return callback('Name and room name are required.');
        }
        let checkName = name.toLowerCase();

        if (!users.isNameFree(checkName)) {
            return callback('Name is not available');
        }

        room = room.toLowerCase();

        socket.join(room);
        users.removeUser(socket.id);
        users.addUser(socket.id, name, room);
        io.to(room).emit('updateUserList', users.getUserList(room));

        socket.emit(
            'newMessage',
            generateMessage('Admin', 'Welcome to the chat app!'),
        );
        socket.broadcast
            .to(room)
            .emit('newMessage', generateMessage('Admin', `${name} has joined`));
        callback();
    });

    // Emit message received from user
    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit(
                'newMessage',
                generateMessage(user.name, message.text, message.color),
            );
        }

        callback();
    });

    socket.on('createLocationMessage', coords => {
        let user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit(
                'newLocationMessage',
                generateLocationMessage(
                    user.name,
                    coords.latitude,
                    coords.longitude,
                ),
            );
        }
    });

    // notify when user disconnects from server
    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit(
                'updateUserList',
                users.getUserList(user.room),
            );
            io.to(user.room).emit(
                'newMessage',
                generateMessage('Admin', `${user.name} has left`),
            );
        }
    });
});

/* SET PORT LISTENER */
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
