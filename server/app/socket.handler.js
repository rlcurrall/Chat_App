const socketio = require('socket.io');
const { Users } = require('../utils/users');
const { MessageListener } = require('./listeners/message.listener');
const { JoinRoomListener } = require('./listeners/joinRoom.listener');
const { DisconnectListener } = require('./listeners/disconnect.listener');
const {
    LocationMessageListener,
} = require('./listeners/locationMessage.listener');
class SocketHandler {
    constructor(server) {
        this.io = socketio(server);
        this.userRepo = new Users();
        this.listeners = {};

        this.register(server);
    }

    register() {
        this.io.on('connection', socket => {
            const joinRoomListener = new JoinRoomListener(
                this.io,
                socket,
                this.userRepo,
            );
            const createMessageListener = new MessageListener(
                this.io,
                socket,
                this.userRepo,
            );
            const createLocationMessageListener = new LocationMessageListener(
                this.io,
                socket,
                this.userRepo,
            );
            const disconnectListener = new DisconnectListener(
                this.io,
                socket,
                this.userRepo,
            );

            socket.on('join', joinRoomListener.handle.bind(joinRoomListener));

            socket.on(
                'message',
                createMessageListener.handle.bind(createMessageListener),
            );

            socket.on(
                'location-message',
                createLocationMessageListener.handle.bind(
                    createLocationMessageListener,
                ),
            );

            socket.on(
                'disconnect',
                disconnectListener.handle.bind(disconnectListener),
            );
        });
    }
}

module.exports = {
    SocketHandler,
};
