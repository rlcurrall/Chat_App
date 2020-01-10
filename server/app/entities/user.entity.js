const Redis = require('ioredis');

class User {
    constructor(username, room) {
        this.username = username.toLowerCase();
        this.room = room.toLowerCase();
    }

    async save() {
        const redis = new Redis(
            `${process.env.REDIS_URL}/${process.env.USER_DB}`,
        );

        await redis.set(`user:${this.room}:${this.username}`, '', 'EX', 7200);
    }

    async delete() {
        const redis = new Redis(
            `${process.env.REDIS_URL}/${process.env.USER_DB}`,
        );

        await redis.del(`user:${this.room}:${this.username}`);

        return this;
    }

    static async delete(username, room) {
        const redis = new Redis(
            `${process.env.REDIS_URL}/${process.env.USER_DB}`,
        );
        room = room.toLowerCase();
        username = username.toLowerCase();

        return await redis.del(`user:${room}:${username}`);
    }

    static async find(username, room) {
        const redis = new Redis(
            `${process.env.REDIS_URL}/${process.env.USER_DB}`,
        );
        room = room.toLowerCase();
        username = username.toLowerCase();

        const exists = await redis.exists(`user:${room}:${username}`);

        if (exists) {
            return new this(username, room);
        }

        return null;
    }

    static async exists(username, room) {
        const redis = new Redis(
            `${process.env.REDIS_URL}/${process.env.USER_DB}`,
        );
        room = room.toLowerCase();
        username = username.toLowerCase();

        const exists = await redis.exists(`user:${room}:${username}`);

        return !!exists;
    }

    static async getByRoom(room) {
        const redis = new Redis(
            `${process.env.REDIS_URL}/${process.env.USER_DB}`,
        );
        const pattern = `user:${room.toLowerCase()}:*`;
        let users = [];

        const results = await redis.scan(0, 'match', pattern);

        for (const u of results[1]) {
            let data = u.split(':');
            users.push(data[2]);
        }

        return users;
    }
}

module.exports = User;
