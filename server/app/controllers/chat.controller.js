/**
 * Attempt to ender a chat room the user was previously in, if the user was not
 * previously part of a room then redirect to the login form.
 *
 * @param {express.request} req
 * @param {express.response} res
 * @param {Function} next
 */
function index(req, res, next) {
    if (req.session.username && req.session.room) {
        res.render('chat', {
            username: req.session.username,
            room: req.session.room,
        });
        return;
    }
    res.redirect('/');
    next();
}

/**
 * Join a chat room as a new user.
 *
 * @param {express.request} req
 * @param {express.response} res
 * @param {Function} next
 */
function newChat(req, res, next) {
    req.session.username = req.body.username;
    req.session.room = req.body.room;

    res.render('chat', req.body);
    next();
}

module.exports = {
    index,
    newChat,
};
