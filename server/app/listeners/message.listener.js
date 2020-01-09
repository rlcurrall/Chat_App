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
    constructor(io, socket, userRepo) {
        this.io = io;
        this.socket = socket;
        this.userRepo = userRepo;
    }

    handle(message, callback) {
        let user = this.userRepo.getUser(this.socket.id);

        if (user && isRealString(message.text)) {
            this.io
                .to(user.room)
                .emit(
                    'message.new',
                    generateMessage(user.name, message.text, message.color),
                );
        }

        callback();
    }
}

module.exports = {
    MessageListener,
};
