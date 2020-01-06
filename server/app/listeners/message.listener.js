const { isRealString } = require('../../utils/validation');
const { generateMessage } = require('../../utils/message');

// Import for documentation and type hint purposes
// eslint-disable-next-line no-unused-vars
const socketIO = require('socket.io');

class MessageListener {
    /**
     * Creates an instance of MessageListener.
     * @param {socketIO.Server} io
     * @param {socketIO.Socket} socket
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
