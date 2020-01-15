const User = require('../entities/user.entity');

/**
 * Show the login form. If the user is already logged in, redirect to the chat
 * page.
 *
 * @param {express.request} req
 * @param {express.response} res
 * @param {Function} next
 */
function showLogin(req, res, next) {
    let data = {};

    if (req.session.username && req.session.room) {
        res.redirect('/chat');
        return;
    }

    if (req.session.errors) {
        data.errors = req.session.errors;
        req.session.errors = null;
    }

    res.render('login', data);
    next();
}

/**
 * Attempt to join a chat room.
 *
 * @param {express.request} req
 * @param {express.response} res
 * @param {Function} next
 */
async function attemptJoin(req, res) {
    const { username, room } = req.body;

    const exists = await User.exists(username, room);

    if (exists) {
        req.session.errors = ['Username is already taken for that room.'];
        return res.redirect('/');
    }

    req.session.username = username;
    req.session.room = room;

    res.redirect('/chat');
}

/**
 * Destroy the user's session.
 *
 * @param {express.request} req
 * @param {express.response} res
 * @param {Function} next
 */
function logout(req, res, next) {
    req.session = null;
    res.redirect('/');
    next();
}

module.exports = {
    showLogin,
    attemptJoin,
    logout,
};
