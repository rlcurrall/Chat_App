const { isRealString } = require('../../utils/validation');
const { generateMessage } = require('../../utils/message');

class MessageListener {
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
                    'newMessage',
                    generateMessage(user.name, message.text, message.color),
                );
        }

        callback();
    }
}

module.exports = {
    MessageListener,
};
