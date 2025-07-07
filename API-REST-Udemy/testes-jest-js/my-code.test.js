const { sum, isOnHour } = require('./my-code.js')

describe('math functions', () => {
    it('sums 2 numbers', () => {
        expect(sum(1,3)).toBe(4);
    });
});

describe('time functions', () => {
    it('returns the timestamp for one hour ahead', () => {
        global.Date.now = jest.fn(() => 0);
        expect(isOnHour()).toBe(3600000);
    });
});