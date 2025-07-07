import { CartItem } from "../interfaces/cart-item";
import { MessagingProtocol } from "../interfaces/messaging-protocol";
import { ShoppingCartProtocol } from "../interfaces/shopping-cart-protocol";
import { PersistencyProtocol } from "../interfaces/persistency-protocol";
import { CustomerOrder } from "../interfaces/customer-protocol";

class ShoppingCartMock implements ShoppingCartProtocol {
    get items(): Readonly<CartItem[]> {
        return [];
    };
    addItem(item: CartItem): void {};
    removeItem(index: number): void {};
    total(): number { return 1 };
    totalWithDicount(): number { return 2 };
    isEmpty(): boolean { return true };
    clear(): void { };
}

class MessaginMock implements MessagingProtocol {
    sendMessage() {}
}

class PesistencyMock implements PersistencyProtocol {
    saveOrder() {}
}

class CustumerMock implements CustomerOrder {
    getName(): string {
        return ''
    }

    getIDN(): string {
        return ''
    }
}

describe('Oder', () => {
    it('should not checkout if cart is empty', () => {

    })
})