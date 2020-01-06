const { generateLocationMessage } = require('../../utils/message');

// Import for documentation and type hint purposes
// eslint-disable-next-line no-unused-vars
const socketIO = require('socket.io');

class LocationMessageListener {
    /**
     * Creates an instance of LocationMessageListener.
     * @param {socketIO.Server} io
     * @param {socketIO.Socket} socket
     * @param {Users} userRepo
     * @memberof LocationMessageListener
     */
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
                    'message.new.location',
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
