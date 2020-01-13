/**
 * Show the login form. If the user is already logged in, redirect to the chat
 * page.
 *
 * @param {express.request} req
 * @param {express.response} res
 * @param {Function} next
 */
function showLogin(req, res, next) {
    if (req.session.username && req.session.room) {
        res.redirect('/chat');
        return;
    }

    res.render('login');
    next();
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
    logout,
};
