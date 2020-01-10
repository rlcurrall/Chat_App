const User = require('../entities/user.entity');
const { getSession } = require('../helpers/session.helpers');
const { generateLocationMessage } = require('../services/message.service');

/**
 * @class LocationMessageListener
 * @property {SocketIO.Server} io
 * @property {SocketIO.Socket} socket
 * @property {Users} userRepo
 */
class LocationMessageListener {
    /**
     * Creates an instance of LocationMessageListener.
     * @param {SocketIO.Server} io
     * @param {SocketIO.Socket} socket
     * @param {Users} userRepo
     * @memberof LocationMessageListener
     */
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
    }

    async handle(coords) {
        const { username, room } = getSession(this.socket);
        const user = await User.find(username, room);

        if (user) {
            this.io
                .to(user.room)
                .emit(
                    'message.new.location',
                    generateLocationMessage(
                        user.username,
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
