import { Discount } from "./discount";
import { ShoppingCart } from "./shopping-cart";

const creatSut = () => {
    const discountMock = createDiscountMock();
    const sut = new ShoppingCart(discountMock);
    return { sut, discountMock };
};

const createDiscountMock = () => {
    class DiscountMock extends Discount { };
    return new DiscountMock();
};

const createCartItem = (name: string, price: number) => {
    class CartItem implements CartItem {
        constructor(public name: string, public price: number) { }
    };

    return new CartItem(name, price);
};

const creatSutWithProducts = () => {
    const { sut, discountMock } = creatSut();
    const cartItem1 = createCartItem('Camiseta', 56);
    const cartItem2 = createCartItem('Shorts', 60);
    sut.addItem(cartItem1);
    sut.addItem(cartItem2);
    return { sut, discountMock };
}

describe('ShoppingCart', () => {
    it('should be an empty cart when no product is added', () => {
        const { sut } = creatSut();
        expect(sut.isEmpty()).toBe(true);
    });

    it('should have 2 cart items', () => {
        const { sut } = creatSutWithProducts();
        expect(sut.items.length).toBe(2);
    });

    it('should test total and totalWithDiscount', () => {
        const { sut } = creatSutWithProducts();
        expect(sut.total()).toBe(116);
        expect(sut.totalWithDicount()).toBe(116)
    });

    it('should add products and clear cards', () => {
        const { sut } = creatSutWithProducts();
        expect(sut.items.length).toBe(2);
        sut.clear();
        expect(sut.items.length).toBe(0);
        expect(sut.isEmpty()).toBe(true);
    });

    it('should remove products', () => {
        const { sut } = creatSutWithProducts();
        expect(sut.items.length).toBe(2);
        sut.removeItem(1);
        expect(sut.items.length).toBe(1);
        sut.removeItem(0);
        expect(sut.isEmpty()).toBe(true);
    });

    it('should call discount.calculate once when totalWithDiscount is called', () => {
        const { sut, discountMock } = creatSutWithProducts();
        const discountMockSpy = jest.spyOn(discountMock, 'calculate');
        sut.totalWithDicount()
        expect(discountMockSpy).toHaveBeenCalledTimes(1)
    });

    it('should call discount.calculate with total price when totalWithDiscount is called', () => {
        const { sut, discountMock } = creatSutWithProducts();
        const discountMockSpy = jest.spyOn(discountMock, 'calculate');
        sut.totalWithDicount()
        expect(discountMockSpy).toHaveBeenCalledWith(sut.total())
    });
});