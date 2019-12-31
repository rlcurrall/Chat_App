const expect = require('expect');
const { describe, it } = require('mocha');

let { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // store res in VAR
        let from = 'Robb';
        let text = 'Hey';

        let res = generateMessage(from, text);

        expect(res).toHaveProperty('from', from);
        expect(res).toHaveProperty('text', text);
        expect(typeof res.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let lat = 15;
        let long = 19;
        let from = 'Admin';
        let url = `https://www.google.com/maps?q=${lat},${long}`;

        let res = generateLocationMessage(from, lat, long);

        expect(res).toHaveProperty('from', from);
        expect(res).toHaveProperty('url', url);
        expect(typeof res.createdAt).toBe('number');
    });
});
