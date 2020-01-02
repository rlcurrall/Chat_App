const { isRealString } = require('../../utils/validation');
const { generateMessage } = require('../../utils/message');

class JoinRoomListener {
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
            .emit('updateUserList', this.userRepo.getUserList(room));

        this.socket.emit(
            'newMessage',
            generateMessage('Admin', 'Welcome to the chat app!'),
        );
        this.socket.broadcast
            .to(room)
            .emit('newMessage', generateMessage('Admin', `${name} has joined`));
        callback();
    }
}

module.exports = {
    JoinRoomListener,
};
