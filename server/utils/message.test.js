const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let lat = 15;
    let long = 19;
    let from = 'Admin';
    let url = 'https://www.google.com/maps?q=15,19';

    let res = generateLocationMessage(from, lat, long);

    expect(res).toInclude({from, url});
    expect(res.createdAt).toBeA('number');
  });
});
