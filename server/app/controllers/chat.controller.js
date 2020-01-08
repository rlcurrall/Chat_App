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
