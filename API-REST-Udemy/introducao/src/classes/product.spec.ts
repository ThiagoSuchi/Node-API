import { Product } from "./product";

const createSut = (name: string, price: number): Product => {
    return new Product(name, price);
}

describe('Product', () => {
    afterEach(() => jest.clearAllMocks());

    it('should return undefined', () => {
        const sut = createSut('Camiseta', 59.9);

        // Os valores podem ser verificados tanto com toHaveProperty:
        expect(sut).toHaveProperty('name', 'Camiseta');
        // Quanto toBeCloseTo:
        expect(sut.price).toBeCloseTo(59.9)
    });
});