const path = require('path');
const express = require('express');
const WebRouter = require('../routes/web');

/**
 * A class for registering all routes on the server.
 *
 * @class RouteProvider
 * @property {express.application} app
 */
class RouteProvider {
    /**
     * Creates an instance of RouteProvider.
     *
     * @param {express.application} app
     * @memberof RouteProvider
     */
    constructor(app) {
        this.app = app;

        this.app.use(express.static(path.join(process.env.ROOT_DIR, 'public')));
    }

    register() {
        this.app.use(WebRouter);
    }
}

module.exports = RouteProvider;
