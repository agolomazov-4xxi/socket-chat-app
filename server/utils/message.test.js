const { generateMessage, generateLocationMessage } = require('./message');
const expect = require('expect');

describe('generateMessage', () => {
	it('should be generate correct message object', () => {
		const from = 'Anton';
		const text = 'Some message';
		const message = generateMessage(from, text);

		expect(message).toInclude({
			from,
			text,
		});
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		const from = 'Deb';
		const lat = 15;
		const long = 19;
		const url = `https://www.google.com/maps?q=15,19`;

		const message = generateLocationMessage(from, lat, long);
		expect(message.url).toEqual(url);
		expect(message).toInclude({ from, url });
	});
});
