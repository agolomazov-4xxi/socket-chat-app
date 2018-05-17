const {generateMessage} = require('./message');
const expect = require('expect');

describe('generateMessage', () => {
  it('should be generate correct message object', () => {
    const from = 'Anton';
    const text = 'Some message';
    const message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      text,
    });
  });
});
