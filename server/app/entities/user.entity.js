const Entity = require('./entity');

/**
 * @class Users
 *
 * TODO This should be changed to use Redis to store the users and room info.
 *      By using Redis to store the information will help to improve the
 *      performance and scalability of the application.
 *      Ref: https://stackoverflow.com/a/11471258
 *
 *      The associated redis commands should be:
 *          ** Add New User **
 *          > MULTI
 *          > HMSET user:{id} username {username} room {room name}
 *          > SADD username:{username} {id}
 *          > SADD room:{room name} {id}
 *          > EXEC
 *
 *          ** Remove User **
 *          > MULTI
 *          > DEL user:{id}
 *          > SREM username:{username} {id}
 *          > SREM room:{room name} {id}
 *          > EXEC
 *
 *          ** Get ID for user by username and room **
 *          > SINTER username:{username} room:{room name}
 */
class Users extends Entity {
    get columns() {
        return ['username', 'room'];
    }

    /**
     * Creates an instance of Users.
     * @memberof Users
     */
    constructor() {
        super({ username: 'temp', room: 'temp' });
        this.users = [];
    }

    /**
     * Add a new user
     *
     * @param {number} id
     * @param {string} name
     * @param {string} room
     * @returns User
     * @memberof Users
     */
    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
        return user;
    }

    /**
     * Remove the given user
     *
     * @param {number} id
     * @returns User
     * @memberof Users
     */
    removeUser(id) {
        let user = this.getUser(id);

        if (user) {
            this.users = this.users.filter(user => user.id !== id);
        }
        return user;
    }

    /**
     * Get a user
     *
     * @param {number} id
     * @returns User[]
     * @memberof Users
     */
    getUser(id) {
        return this.users.filter(user => user.id === id)[0];
    }

    /**
     * Determine if the name is available
     *
     * @param {string} name
     * @returns boolean
     * @memberof Users
     */
    isNameFree(name) {
        let testUser = this.users.filter(
            user => user.name.toLowerCase() === name,
        )[0];
        if (testUser) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Get list of users for a given room
     *
     * @param {string} room
     * @returns string[]
     * @memberof Users
     */
    getUserList(room) {
        let users = this.users.filter(user => user.room === room);
        let namesArray = users.map(user => user.name);
        return namesArray;
    }
}

module.exports = { Users };
