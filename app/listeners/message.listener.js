const User = require('../entities/user.entity');
const SessionService = require('../services/session.service');
const { isRealString } = require('../services/validation.service');
const { generateMessage } = require('../services/message.service');

/**
 * @class MessageListener
 * @property {SocketIO.Server} io
 * @property {SocketIO.Socket} socket
 * @property {Users} userRepo
 */
class MessageListener {
    /**
     * Creates an instance of MessageListener.
     * @param {SocketIO.Server} io
     * @param {SocketIO.Socket} socket
     * @param {Users} userRepo
     * @memberof MessageListener
     */
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
    }

    async handle({ text, color }, callback) {
        const { username, room } = SessionService.getSessionFromSocket(
            this.socket,
        );

        let user = await User.find(username, room);

        if (user && isRealString(text)) {
            this.io
                .to(user.room)
                .emit(
                    'chat.new.message',
                    generateMessage(user.username, text, color),
                );
        }

        callback();
    }
}

module.exports = MessageListener;
