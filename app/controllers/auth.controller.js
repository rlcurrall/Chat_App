const User = require('../entities/user.entity');

/**
 * Controller for Authentication routes.
 *
 * @class AuthController
 */
class AuthController {
    /**
     * Show the login form.
     *
     *      If the user is already logged in, redirect to the chat page.
     *
     * @static
     * @param {express.request} req
     * @param {express.response} res
     * @param {Function} next
     * @returns
     * @memberof AuthController
     */
    static showLogin(req, res, next) {
        let data = {};

        // User has an active session.
        if (req.session.username && req.session.room) {
            res.redirect('/chat');
            return;
        }

        // User was redirected with errors.
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
     * @static
     * @async
     * @param {express.request} req
     * @param {express.response} res
     * @param {Function} next
     * @returns
     * @memberof AuthController
     */
    static async attemptJoin(req, res, next) {
        const { username, room } = req.body;

        const exists = await User.exists(username, room);

        if (exists) {
            req.session.errors = ['Username is already taken for that room.'];
            return res.redirect('/');
        }

        req.session.username = username;
        req.session.room = room;

        res.redirect('/chat');
        next();
    }

    /**
     * Destroy the user's session.
     *
     * @static
     * @param {express.request} req
     * @param {express.response} res
     * @param {Function} next
     * @memberof AuthController
     */
    static logout(req, res, next) {
        req.session = null;
        res.redirect('/');
        next();
    }
}

module.exports = AuthController;
