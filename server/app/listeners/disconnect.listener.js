const { generateMessage } = require('../services/message.service');

/**
 * @class DisconnectListener
 * @property {SocketIO.Server} io
 * @property {SocketIO.Socket} socket
 * @property {Users} userRepo
 */
class DisconnectListener {
    /**
     * Creates an instance of DisconnectListener.
     *
     * @param {SocketIO.Server} io
     * @param {SocketIO.Socket} socket
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
