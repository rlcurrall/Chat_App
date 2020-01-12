const CookieSessionMiddleware = require('../middleware/session.middleware');

/**
 * Service class to interact with the express session.
 *
 * @class SessionService
 */
class SessionService {
    /**
     * Get session information from a socket using the cookie session
     * middleware.
     *
     * @static
     * @param {SocketIO.Socket} socket
     * @returns {Object}
     * @memberof SessionService
     */
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
