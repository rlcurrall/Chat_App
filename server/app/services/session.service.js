const CookieSessionMiddleware = require('../middleware/session.middleware');

class SessionService {
    static getSessionFromSocket(socket) {
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
}

module.exports = SessionService;
