function showLogin(req, res, next) {
    if (req.session.username && req.session.room) {
        res.redirect('/chat');
        return;
    }

    res.render('home');
    next();
}

function logout(req, res, next) {
    req.session = null;
    res.redirect('/');
    next();
}

module.exports = {
    showLogin,
    logout,
};
