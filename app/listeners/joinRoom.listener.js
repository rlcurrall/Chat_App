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

        let user = await User.find(username, room);
        if (!user) {
            user = new User(username, room);
            user.save();
        }

        let users = await User.getByRoom(room);

        this.socket.join(room);

        this.io.to(room).emit('chat.update.users', users);

        this.socket.emit(
            'chat.new.message',
            generateMessage('Admin', 'Welcome to the chat app!'),
        );
        this.socket.broadcast
            .to(room)
            .emit(
                'chat.new.message',
                generateMessage('Admin', `${username} has joined`),
            );
        callback();
    }
}

module.exports = JoinRoomListener;
