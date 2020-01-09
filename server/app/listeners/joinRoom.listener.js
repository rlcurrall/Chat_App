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
    constructor(io, socket, userRepo) {
        this.io = io;
        this.socket = socket;
        this.userRepo = userRepo;
    }

    handle({ name, room }, callback) {
        if (!isRealString(name) || !isRealString(room)) {
            return callback('Name and room name are required.');
        }
        let checkName = name.toLowerCase();

        if (!this.userRepo.isNameFree(checkName)) {
            return callback('Name is not available');
        }

        room = room.toLowerCase();

        this.socket.join(room);
        this.userRepo.removeUser(this.socket.id);
        this.userRepo.addUser(this.socket.id, name, room);
        this.io
            .to(room)
            .emit('user-list.update', this.userRepo.getUserList(room));

        this.socket.emit(
            'message.new',
            generateMessage('Admin', 'Welcome to the chat app!'),
        );
        this.socket.broadcast
            .to(room)
            .emit(
                'message.new',
                generateMessage('Admin', `${name} has joined`),
            );
        callback();
    }
}

module.exports = {
    JoinRoomListener,
};
