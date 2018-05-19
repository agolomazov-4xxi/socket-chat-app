// addUser
// removeUser
// getUser
// getUserList(room)

class Users {
	constructor() {
		this.users = [];
	}

	addUser(id, name, room) {
		const user = { id, name, room };
		this.users.push(user);
		return user;
	}

	getUser(id) {
		return this.users.find(user => user.id === id);
	}

	removeUser(id) {
		const user = this.getUser(id);

		if (user) {
			this.users = this.users.filter(user => user.id !== id);
		}

		return user;
	}

	getUserList(room) {
		let users = this.users.filter(user => user.room === room);
		return users.map(user => user.name);
	}
}

module.exports = { Users };

// class Person {
// 	constructor(name, age) {
// 		this.name = name;
// 		this.age = age;
// 	}
// 	getUserDescription() {
// 		return `${this.name} is ${this.age} year(s) old`;
// 	}
// }
