const User = require('../entities/user.entity');

/**
 * Controller for all Chat related routes.
 *
 * @class ChatController
 */
class ChatController {
    /**
     * Attempt to ender a chat room the user was previously in, if the user was not
     * previously part of a room then redirect to the login form.
     *
     * @static
     * @async
     * @param {express.request} req
     * @param {express.response} res
     * @param {Function} next
     * @returns
     * @memberof ChatController
     */
    static async index(req, res, next) {
        const { username, room } = req.session;

        if (username && room) {
            const exists = await User.exists(username, room);

            if (exists) {
                res.render('errors/user-taken', {
                    username,
                    room,
                });
                return;
            }

            const user = new User(username, room);
            await user.save();

            res.render('chat', {
                username,
                room,
            });
            return;
        }

        res.redirect('/');
        next();
    }
}

module.exports = ChatController;
