describe('Sauce Demo Empty Cart Checkout Test', () => {
    before(async () => {
        await browser.url('saucedemo.com/');

        const usernameInput = await $('#user-name');
        await usernameInput.setValue('standard_user');

        const passwordInput = await $('#password');
        await passwordInput.setValue('secret_sauce');

        const loginButton = await $('#login-button');
        await loginButton.click();

        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('inventory.html');
        }, { timeout: 10000, timeoutMsg: 'Login failed: inventory page did not load' });
    });

    it('should verify empty cart and checkout process', async () => {
        const cartButton = await $('[data-test="shopping-cart-link"]');
        await cartButton.waitForClickable({ timeout: 5000 });
        await cartButton.click();

        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('cart.html');
        }, { timeout: 5000, timeoutMsg: 'Cart page did not load' });

        const cartList = await $('[data-test="cart-list"]');
        await cartList.waitForDisplayed({ timeout: 5000 });
        
        const qtyLabel = await $('[data-test="cart-quantity-label"]');
        const descLabel = await $('[data-test="cart-desc-label"]');
        
        expect(await qtyLabel.isDisplayed()).toBe(true);
        expect(await descLabel.isDisplayed()).toBe(true);
        
        const cartItems = await $$('.cart_item');
        expect(cartItems.length).toBe(0);

        const checkoutButton = await $('[data-test="checkout"]');
        await checkoutButton.waitForClickable({ timeout: 5000 });
        await checkoutButton.click();

        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('checkout-step-one.html');
        }, { timeout: 5000, timeoutMsg: 'Checkout page did not load' });
    });
});