/**
 * @class Users
 */
class Users {
    /**
     * Creates an instance of Users.
     * @memberof Users
     */
    constructor() {
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
