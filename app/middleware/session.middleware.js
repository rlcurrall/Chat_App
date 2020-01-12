const cookieSession = require('cookie-session');

const CookieSessionMiddleware = cookieSession({
    name: 'chat-session',
    signed: false,
});

module.exports = CookieSessionMiddleware;
