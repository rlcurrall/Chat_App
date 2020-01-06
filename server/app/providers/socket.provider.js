const { Users } = require('../entities/user.entity');
const { MessageListener } = require('../listeners/message.listener');
const { JoinRoomListener } = require('../listeners/joinRoom.listener');
const { DisconnectListener } = require('../listeners/disconnect.listener');
const {
    LocationMessageListener,
} = require('../listeners/locationMessage.listener');

class SocketProvider {
    constructor(io) {
        this.io = io;
        this.userRepo = new Users();
    }

    get listeners() {
        return {
            message: MessageListener,
            join: JoinRoomListener,
            disconnect: DisconnectListener,
            'location-message': LocationMessageListener,
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

module.exports = {
    SocketProvider,
};
