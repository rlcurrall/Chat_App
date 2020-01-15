const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const ChatController = require('../controllers/chat.controller');

const router = new Router();

router.get('/', AuthController.showLogin);
router.post('/chat', AuthController.attemptJoin);
router.get('/chat', ChatController.index);
router.get('/logout', AuthController.logout);

router.all('*', (_, res) => {
    if (!res.headersSent) {
        res.redirect('/');
    }
});

module.exports = router;
