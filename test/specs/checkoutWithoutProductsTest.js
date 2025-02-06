const loginPage = require('../pageobjects/login.page');
const cartPage = require('../pageobjects/cart.page');
const checkoutPage = require('../pageobjects/checkout.page');

describe('Sauce Demo Empty Cart Checkout Test', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('should verify empty cart and checkout process', async () => {
        await cartPage.openCart();

        const isEmpty = await cartPage.isCartEmpty();
        expect(isEmpty).toBe(true);

        await cartPage.proceedToCheckout();

        const errorMessage = await $('.error-message');
        await expect(errorMessage).toBeDisplayed();
        await expect(errorMessage.getText()).toBe('Your cart is empty');
    });
});
