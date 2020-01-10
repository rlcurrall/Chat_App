const CookieSessionMiddleware = require('../middleware/session.middleware');

function getSession(socket) {
    let cookieString = socket.request.headers.cookie;
    let session = null;

    let req = {
        connection: { encrypted: false },
        headers: { cookie: cookieString },
    };
    let res = { getHeader: () => {}, setHeader: () => {} };

    CookieSessionMiddleware(req, res, () => {
        session = req.session;
    });

    return session;
}

module.exports = {
    getSession,
};
