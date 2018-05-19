const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
	let users;

	beforeEach(() => {
		users = new Users();
		users.users = [
			{
				id: '1',
				name: 'Mike',
				room: 'Node Course',
			},
			{
				id: '2',
				name: 'Jen',
				room: 'React Course',
			},
			{
				id: '3',
				name: 'Alison',
				room: 'Node Course',
			},
		];
	});

	it('should add new user', () => {
		users = new Users();
		const user = {
			id: '123',
			name: 'Anton',
			room: 'The office fans',
		};
		const newUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('should remove a user', () => {
		const userId = '1';
		const user = users.removeUser(userId);

		expect(user.id).toEqual(userId);
	});

	it('should not remove user', () => {});

	it('should find user', () => {
		const userId = '2';
		const user = users.getUser(userId);

		expect(user.id).toEqual(userId);
	});

	it('should not find user', () => {
		const userId = '13';
		const user = users.getUser(userId);

		expect(user).toNotExist();
	});

	it('should return names for node course', () => {
		const userList = users.getUserList('Node Course');
		expect(userList).toEqual(['Mike', 'Alison']);
	});

	it('should return names for react course', () => {
		const userList = users.getUserList('React Course');
		expect(userList).toEqual(['Jen']);
	});
});
