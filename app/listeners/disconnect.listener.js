const User = require('../entities/user.entity');
const SessionService = require('../services/session.service');
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
        const { username, room } = SessionService.getSessionFromSocket(
            this.socket,
        );
        const user = await User.find(username, room);

        if (!user) {
            return;
        }

        this.socket.leave(room);
        this.socket.disconnect();
        await user.delete();

        let users = await User.getByRoom(room);

        this.io.to(user.room).emit('chat.update.users', users);
        this.io
            .to(user.room)
            .emit(
                'chat.new.message',
                generateMessage('Admin', `${user.username} has left`),
            );
    }
}

module.exports = DisconnectListener;
