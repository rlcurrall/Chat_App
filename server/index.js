require('./bootstrap');

const { Server } = require('./app/server');

const server = new Server();

server.boot();
