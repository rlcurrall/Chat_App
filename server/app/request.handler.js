const path = require('path');
const express = require('express');

class RequestHandler {
    static make() {
        const app = express();

        this.register(app);

        return app;
    }

    static register(app) {
        app.use(express.static(path.join(process.env.ROOT_DIR, 'public')));

        app.get('/', (_, res) =>
            res.sendFile(path.join(process.env.SERVER_DIR, 'views/index.html')),
        );

        app.get('/chat', (_, res) =>
            res.sendFile(path.join(process.env.SERVER_DIR, 'views/chat.html')),
        );

        app.get('*', (_, res) => res.redirect('/'));
    }
}

module.exports = {
    RequestHandler,
};
