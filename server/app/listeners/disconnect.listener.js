const User = require('../entities/user.entity');
const { getSession } = require('../helpers/session.helpers');
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
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
    }

    async handle() {
        const { username, room } = getSession(this.socket);
        const user = await User.find(username, room);

        if (!user) {
            return;
        }

        this.socket.leave(room);
        user.delete();

        let users = await User.getByRoom(room);

        if (user) {
            this.io.to(user.room).emit('user-list.update', users);
            this.io
                .to(user.room)
                .emit(
                    'message.new',
                    generateMessage('Admin', `${user.username} has left`),
                );
        }
    }
}

module.exports = {
    DisconnectListener,
};
