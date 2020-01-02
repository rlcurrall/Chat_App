const { generateLocationMessage } = require('../../utils/message');

class LocationMessageListener {
    constructor(io, socket, userRepo) {
        this.io = io;
        this.socket = socket;
        this.userRepo = userRepo;
    }

    handle(coords) {
        let user = this.userRepo.getUser(this.socket.id);

        if (user) {
            this.io
                .to(user.room)
                .emit(
                    'newLocationMessage',
                    generateLocationMessage(
                        user.name,
                        coords.latitude,
                        coords.longitude,
                    ),
                );
        }
    }
}

module.exports = {
    LocationMessageListener,
};
