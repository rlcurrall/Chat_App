const User = require('../entities/user.entity');

/**
 * Attempt to ender a chat room the user was previously in, if the user was not
 * previously part of a room then redirect to the login form.
 *
 * @param {express.request} req
 * @param {express.response} res
 * @param {Function} next
 */
async function index(req, res, next) {
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

        res.render('chat', {
            username,
            room,
        });
        return;
    }

    res.redirect('/');
    next();
}

module.exports = {
    index,
};
