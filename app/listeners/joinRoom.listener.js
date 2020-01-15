const User = require('../entities/user.entity');
const { isRealString } = require('../services/validation.service');
const { generateMessage } = require('../services/message.service');

/**
 * @class JoinRoomListener
 * @property {SocketIO.Server} io
 * @property {SocketIO.Socket} socket
 * @property {Users} userRepo
 */
class JoinRoomListener {
    /**
     * Creates an instance of JoinRoomListener.
     * @param {SocketIO.Server} io
     * @param {SocketIO.Socket} socket
     * @param {Users} userRepo
     * @memberof JoinRoomListener
     */
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
    }

    async handle({ username, room }, callback) {
        if (!isRealString(username) || !isRealString(room)) {
            return callback('Name and room name are required.');
        }

        let user = await User.find(username, room); // TODO check if user null...
        let users = await User.getByRoom(user.room);

        this.socket.join(user.room);

        this.io.to(user.room).emit('user-list.update', users);

        this.socket.emit(
            'message.new',
            generateMessage('Admin', 'Welcome to the chat app!'),
        );
        this.socket.broadcast
            .to(user.room)
            .emit(
                'message.new',
                generateMessage('Admin', `${user.username} has joined`),
            );
        callback();
    }
}

module.exports = JoinRoomListener;
