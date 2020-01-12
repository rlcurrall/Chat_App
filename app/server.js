const http = require('http');
const path = require('path');
const helmet = require('helmet');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const RouteProvider = require('./providers/route.provider');
const SocketProvider = require('./providers/socket.provider');
const CookieSessionMiddleware = require('./middleware/session.middleware');

const registerRoutes = Symbol('registerRoutes');
const registerSocket = Symbol('registerSocket');
const registerGlobalMiddleware = Symbol('registerGlobalMiddleware');

/**
 * An instance of a server.
 *
 * @class Server
 * @property {express.application} app
 * @property {http.Server} server
 * @property {socketIO.Server} io
 */
class Server {
    /**
     * Creates an instance of Server.
     * @memberof Server
     */
    constructor() {
        let app = express();
        let server = http.createServer(app);
        let io = socketIO(server);

        app.io = io;

        app.set('trust proxy', 1);
        app.disable('x-powered-by');

        app.set('views', path.join(process.env.ROOT_DIR, 'views'));
        app.set('view engine', 'ejs');

        this.app = app;
        this.server = server;
        this.io = io;
    }

    /**
     * Start the server listening on the port defined by the environment
     * variable 'PORT'.
     *
     * @memberof Server
     */
    boot() {
        this[registerGlobalMiddleware]();
        this[registerRoutes]();
        this[registerSocket]();

        this.server.listen(process.env.PORT || 3000, () => {
            console.log(`Server is up on port ${process.env.PORT || 3000}`);
        });
    }

    [registerGlobalMiddleware]() {
        this.app.use(helmet());

        this.app.use(CookieSessionMiddleware);

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

module.exports = Server;
