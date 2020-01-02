const { generateMessage } = require('../../utils/message');

class DisconnectListener {
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
                .emit('updateUserList', this.userRepo.getUserList(user.room));
            this.io
                .to(user.room)
                .emit(
                    'newMessage',
                    generateMessage('Admin', `${user.name} has left`),
                );
        }
    }
}

module.exports = {
    DisconnectListener,
};
