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
    if (req.session.username && req.session.room) {
        const exists = await User.exists(
            req.session.username,
            req.session.room,
        );

        if (exists) {
            // handle where exists (i.e. show an error page)
        }

        res.render('chat', {
            username: req.session.username,
            room: req.session.room,
        });
        return;
    }
    res.redirect('/');
    next();
}

module.exports = {
    index,
};
