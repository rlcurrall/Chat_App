const Users = require('../entities/users');
const MessageListener = require('../listeners/message.listener');
const JoinRoomListener = require('../listeners/joinRoom.listener');
const DisconnectListener = require('../listeners/disconnect.listener');
const LocationMessageListener = require('../listeners/locationMessage.listener');

/**
 * Provide all listeners for events on the socket connection.
 *
 * @class SocketProvider
 * @property {SocketIO.Server} io
 */
class SocketProvider {
    /**
     * Creates an instance of SocketProvider.
     * @param {SocketIO.Server} io
     * @memberof SocketProvider
     */
    constructor(io) {
        this.io = io;
        this.userRepo = new Users();
    }

    get listeners() {
        return {
            disconnect: DisconnectListener,
            'room.join': JoinRoomListener,
            'message.post': MessageListener,
            'message.post.location': LocationMessageListener,
        };
    }

    register() {
        this.io.on('connection', socket => {
            for (const key in this.listeners) {
                if (key in this.listeners) {
                    const listener = this.listeners[key];
                    const listenerInstance = new listener(
                        this.io,
                        socket,
                        this.userRepo,
                    );

                    socket.on(
                        key,
                        listenerInstance.handle.bind(listenerInstance),
                    );
                }
            }
        });
    }
}

module.exports = SocketProvider;
