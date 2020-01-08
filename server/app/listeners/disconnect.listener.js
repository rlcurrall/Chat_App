const { generateMessage } = require('../services/message.service');

// Import for documentation and type hint purposes
// eslint-disable-next-line no-unused-vars
const socketIO = require('socket.io');

class DisconnectListener {
    /**
     * Creates an instance of DisconnectListener.
     *
     * @param {socketIO.Server} io
     * @param {socketIO.Socket} socket
     * @param {Users} userRepo
     * @memberof DisconnectListener
     */
    constructor(io, socket, userRepo) {
        this.io = io;
        this.socket = socket;
        this.userRepo = userRepo;
    }

    handle() {
        let user = this.userRepo.removeUser(this.socket.id);

        if (user) {
            this.io
                .to(user.room)
                .emit('user-list.update', this.userRepo.getUserList(user.room));
            this.io
                .to(user.room)
                .emit(
                    'message.new',
                    generateMessage('Admin', `${user.name} has left`),
                );
        }
    }
}

module.exports = {
    DisconnectListener,
};
