import {
    Discount,
    FiftyPercentDiscount,
    NoDiscount,
    TenPercentDiscount
} from "./discount";

const createSut = (className: new () => Discount): Discount => {
    return new className();
}

// O toBe é uma comparação estrita (===). Ele verifica se dois valores são exatamente iguais — mesmo tipo, mesmo valor.
// toBeCloseTo é usado para comparar números com casas decimais, aceitando uma margem de erro (tolerância).
describe('Product', () => {
    afterEach(() => jest.clearAllMocks());

    it('should have no discount', () => {
        const sut = createSut(NoDiscount);
        expect(sut.calculate(10.8)).toBeCloseTo(10.8);
    });

    it('should have no discount', () => {
        const sut = createSut(NoDiscount);
        expect(sut.calculate(10.8)).toBeCloseTo(10.8);
    });

    it('should apply 50% discount on price', () => {
        const sut = createSut(FiftyPercentDiscount);
        expect(sut.calculate(150.50)).toBeCloseTo(75.25);
    });

    it('should apply 10% discount on price', () => {
        const sut = createSut(TenPercentDiscount);
        expect(sut.calculate(10)).toBeCloseTo(9);
    });
});