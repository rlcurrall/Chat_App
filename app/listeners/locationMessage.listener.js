const User = require('../entities/user.entity');
const SessionService = require('../services/session.service');
const { generateLocationMessage } = require('../services/message.service');

/**
 * @class LocationMessageListener
 * @property {SocketIO.Server} io
 * @property {SocketIO.Socket} socket
 */
class LocationMessageListener {
    /**
     * Creates an instance of LocationMessageListener.
     * @param {SocketIO.Server} io
     * @param {SocketIO.Socket} socket
     * @memberof LocationMessageListener
     */
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
    }

    async handle(coords) {
        const { username, room } = SessionService.getSessionFromSocket(
            this.socket,
        );
        const user = await User.find(username, room);

        if (user) {
            this.io
                .to(user.room)
                .emit(
                    'chat.new.message.location',
                    generateLocationMessage(
                        user.username,
                        coords.latitude,
                        coords.longitude,
                    ),
                );
        }
    }
}

module.exports = LocationMessageListener;
