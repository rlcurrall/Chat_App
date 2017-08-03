// Array of user objects


// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor () {
    this.users = []
  }

  addUser (id, name, room) {
    let user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    let user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  isNameFree (name) {
    let testUser = this.users.filter((user) => user.name.toLowerCase() === name)[0];
    if (testUser) {
      return false;
    } else {
      return true;
    }
  }

  getUserList (room) {
    let users = this.users.filter((user) => user.room === room);
    let namesArray = users.map((user) => user.name);
    return namesArray;
  }
}

module.exports = {Users};
