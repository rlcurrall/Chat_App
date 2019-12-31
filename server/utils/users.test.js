const expect = require('expect');
const { describe, it, beforeEach } = require('mocha');

const { Users } = require('./users');

describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'mike',
                room: 'node',
            },
            {
                id: '2',
                name: 'jan',
                room: 'react',
            },
            {
                id: '3',
                name: 'dan',
                room: 'node',
            },
        ];
    });

    // addUser
    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Robb',
            room: 'Test',
        };
        users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    // removeUser
    it('should remove a user', () => {
        let userID = '1';
        let user = users.removeUser(userID);
        expect(user.id).toEqual(userID);
    });

    // removeUser
    it('should not remove a user', () => {
        let removed = users.removeUser('12345');
        expect(removed).toBeFalsy();
    });

    it('should find user', () => {
        let userID = '2';
        let user = users.getUser(userID);
        expect(user.id).toEqual(userID);
    });

    it('should not find a user', () => {
        let userID = '12345';
        let user = users.getUser(userID);
        expect(user).toBeFalsy();
    });

    // getUserList
    it('should return names for node course', () => {
        let usersList = users.getUserList('node');
        expect(usersList).toEqual(['mike', 'dan']);
    });

    // getUserList
    it('should return names for react course', () => {
        let usersList = users.getUserList('react');
        expect(usersList).toEqual(['jan']);
    });
});
