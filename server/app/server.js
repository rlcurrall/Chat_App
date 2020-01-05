const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const { RouteProvider } = require('./providers/route.provider');
const { SocketProvider } = require('./providers/socket.provider');

const registerRoutes = Symbol('registerRoutes');
const registerSocket = Symbol('registerSocket');
const registerGlobalMiddleware = Symbol('registerGlobalMiddleware');

class Server {
    constructor() {
        let app = express();
        let server = http.createServer(app);
        let io = socketio(server);

        app.io = io;
        app.set('views', path.join(process.env.SERVER_DIR, 'views'));
        app.set('view engine', 'ejs');

        this.app = app;
        this.server = server;
        this.io = io;
    }

    boot() {
        this[registerGlobalMiddleware]();
        this[registerRoutes]();
        this[registerSocket]();

        this.server.listen(process.env.PORT || 3000, () => {
            console.log(`Server is up on port ${process.env.PORT || 3000}`);
        })
    }

    [registerGlobalMiddleware]() {
        this.app.use(session({
            name: 'chat-session',
            signed: false,
        }));

        this.app.use(bodyParser.json());

        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    [registerRoutes]() {
        const routeProvider = new RouteProvider(this.app);

        routeProvider.register();
    }

    [registerSocket]() {
        const socketProvider = new SocketProvider(this.io);

        socketProvider.register();
    }
}

module.exports = {
    Server
};
