const path = require('path');
const express = require('express');
const AuthController = require('../controllers/auth.controller');
const ChatController = require('../controllers/chat.controller');

/**
 *A class for registering all routes on the server.
 *
 * @class RouteProvider
 * @property {express.application} app
 */
class RouteProvider {
    /**
     * Creates an instance of RouteProvider.
     * @param {express.application} app
     * @memberof RouteProvider
     */
    constructor(app) {
        this.app = app;

        this.app.use(
            express.static(path.join(process.env.ROOT_DIR, this.publicPath)),
        );
    }

    get publicPath() {
        return 'public';
    }

    get routes() {
        return {
            // route definitions here
        };
    }

    register() {
        this.app.get('/', AuthController.showLogin);

        this.app.get('/chat', ChatController.index);

        this.app.post('/chat', ChatController.newChat);

        this.app.get('/logout', AuthController.logout);

        this.app.all('*', (_, res) => {
            if (!res.headersSent) {
                res.redirect('/');
            }
        });
    }
}

module.exports = RouteProvider;
