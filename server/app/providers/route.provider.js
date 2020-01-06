const path = require('path');
const express = require('express');

/**
 *A class for registering all routes on the server.
 *
 * @class RouteProvider
 * @property express.Express app
 */
class RouteProvider {
    constructor(app) {
        this.app = app;
    }

    get routes() {
        return {
            // route definitions here
        };
    }

    register() {
        this.app.use(express.static(path.join(process.env.ROOT_DIR, 'public')));

        this.app.get('/', (req, res) => {
            if (req.session.username && req.session.room) {
                res.redirect('/chat');
                return;
            }

            res.render('home');
        });

        this.app.get('/chat', (req, res) => {
            if (req.session.username && req.session.room) {
                res.render('chat', {
                    username: req.session.username,
                    room: req.session.room,
                });
                return;
            }
            res.redirect('/');
        });

        this.app.post('/chat', (req, res) => {
            req.session.username = req.body.username;
            req.session.room = req.body.room;

            res.render('chat', req.body);
        });

        this.app.get('/logout', (req, res) => {
            req.session = null;
            res.redirect('/');
        });

        this.app.get('*', (_, res) => res.redirect('/'));
    }
}

module.exports = {
    RouteProvider,
};
