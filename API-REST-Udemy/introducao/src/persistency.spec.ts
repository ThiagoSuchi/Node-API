import { Persistency } from "./persistency";

describe('Persistency', () => {
    it('should return undefined', () => {
        // SUT - System Under Test
        const sut = new Persistency();
        expect(sut.saveOrder()).toBeUndefined();
    })
})