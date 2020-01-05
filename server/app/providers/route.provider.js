const express = require('express');
const path = require('path');

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
            res.render('home');
        });

        this.app.get('/chat', (_, res) => {
            res.render('chat');
        });

        this.app.post('/chat', (req, res) => {
            res.render('chat', req.body);
        });

        this.app.get('*', (_, res) => res.redirect('/'));
    }
}

module.exports = {
    RouteProvider,
};
