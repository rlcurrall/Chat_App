const expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // store res in VAR
    let from = 'Robb';
    let text = 'Hey';

    let res = generateMessage(from,text);

    expect(res).toInclude({from,text});
    expect(res.createdAt).toBeA('number');
  });
});
