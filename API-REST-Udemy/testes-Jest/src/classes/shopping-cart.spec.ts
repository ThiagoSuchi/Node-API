import { Discount } from "./discount";
import { ShoppingCart } from "./shopping-cart";

const creatSut = () => {
    class DiscountMock extends Discount {}
    const discountMock = new DiscountMock()
    const sut = new ShoppingCart(discountMock);
    return { sut, discountMock };
}

describe('ShoppingCart', () => {
    it('should be an empty cart when no product is added', () => {
        
    })
})