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

        redis.disconnect();

        return this;
    }

    async delete() {
        const redis = new Redis(
            `${process.env.REDIS_URL}/${process.env.USER_DB}`,
        );

        await redis.del(`user:${this.room}:${this.username}`);
        redis.disconnect();

        return this;
    }

    static async delete(username, room) {
        const redis = new Redis(
            `${process.env.REDIS_URL}/${process.env.USER_DB}`,
        );
        room = room.toLowerCase();
        username = username.toLowerCase();

        const res = await redis.del(`user:${room}:${username}`);
        redis.disconnect();

        return res;
    }

    static async find(username, room) {
        const redis = new Redis(
            `${process.env.REDIS_URL}/${process.env.USER_DB}`,
        );
        room = room.toLowerCase();
        username = username.toLowerCase();

        const exists = await redis.exists(`user:${room}:${username}`);
        redis.disconnect();

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
        redis.disconnect();

        return !!exists;
    }

    static async getByRoom(room) {
        const redis = new Redis(
            `${process.env.REDIS_URL}/${process.env.USER_DB}`,
        );
        const pattern = `user:${room.toLowerCase()}:*`;
        let users = [];

        const results = await redis.scan(0, 'match', pattern);
        redis.disconnect();

        for (const u of results[1]) {
            let data = u.split(':');
            users.push(data[2]);
        }

        return users;
    }
}

module.exports = User;
