require('./bootstrap');

const http = require('http');
const { RequestHandler } = require('./app/request.handler');
const { SocketHandler } = require('./app/socket.handler');

/* SERVER & SOCKET CONFIG */
const requestHandler = RequestHandler.make();
const server = http.createServer(requestHandler);
SocketHandler.register(server);

/* SET PORT LISTENER */
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is up on port ${process.env.PORT || 3000}`);
});
