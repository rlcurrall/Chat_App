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

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

// set port for app
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
