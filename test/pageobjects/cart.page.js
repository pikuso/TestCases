const Page = require('./page');

class CartPage extends Page {
    get cartButton() {
        return $('.shopping_cart_link');
    }

    get checkoutButton() {
        return $('.checkout_button');
    }

    get cartItemCount() {
        return $('.cart_quantity');
    }

    get cartIcon() {
        return $('.shopping_cart_link');
    }

    get cartItems() {
        return $$('.cart_item');  
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async verifyCartCount(expectedCount) {
        const items = await this.cartItems;  
        expect(items.length).toBe(expectedCount);
    }

    async verifyCartItemIsDisplayed(productName) {
        const items = await $$('.cart_item [data-test="inventory-item-name"]');
        for (let item of items) {
            const itemName = await item.getText();
            if (itemName === productName) {
                return;
            }
        }
        throw new Error(`Product "${productName}" not found in cart`);
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();  
    }

    async isCartEmpty() {
        const items = await this.cartItems;  
        return items.length === 0;
    }

    async verifyCartItem(productName) {
        const items = await $$('.cart_item');
    
        if (items.length === 0) {
            throw new Error("No items found in cart");
        }
    
        for (let item of items) {
            const itemName = await item.$('.inventory_item_name').getText();
            if (itemName === productName) {
                return;
            }
        }
    
        throw new Error(`Product "${productName}" not found in cart`);
    }
    
    
}

module.exports = new CartPage();
