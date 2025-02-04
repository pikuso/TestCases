describe('Sauce Demo Valid Checkout Test', () => {
    let productName, productPrice;

    before(async () => {
        await browser.url('saucedemo.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
    });

    it('should complete checkout process successfully', async () => {
        const addToCartBtn = await $('[data-test="add-to-cart-sauce-labs-backpack"]');
        await addToCartBtn.click();
        
        productName = await $('.inventory_item_name').getText();
        productPrice = await $('.inventory_item_price').getText();
        
        const cartBadge = await $('.shopping_cart_badge');
        expect(await cartBadge.getText()).toBe('1');

        await $('[data-test="shopping-cart-link"]').click();
        const cartItem = await $('.cart_item');
        expect(await cartItem.$('.inventory_item_name').getText()).toBe(productName);

        await $('[data-test="checkout"]').click();
        
        await $('[data-test="firstName"]').setValue('John');
        await $('[data-test="lastName"]').setValue('Doe');
        await $('[data-test="postalCode"]').setValue('12345');
        await $('[data-test="continue"]').click();

        const overviewProduct = await $('.inventory_item_name');
        const overviewPrice = await $('.summary_subtotal_label');
        expect(await overviewProduct.getText()).toBe(productName);
        expect(await overviewPrice.getText()).toContain(productPrice);

        await $('[data-test="finish"]').click();
        const thankYouMessage = await $('.complete-header');
        expect(await thankYouMessage.getText()).toBe('Thank you for your order!');

        await $('[data-test="back-to-products"]').click();
        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('/inventory.html');
        });
        
        const cartItems = await $$('.shopping_cart_badge');
        expect(cartItems.length).toBe(0);
    });
});