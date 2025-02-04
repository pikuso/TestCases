describe('Sauce Demo Cart Persistence Test', () => {
    before(async () => {
        await browser.url('saucedemo.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        
        await browser.waitUntil(async () => {
            const url = await browser.getUrl();
            return url.includes('/inventory.html');
        }, { timeout: 5000 });
    });

    it('should maintain products in cart after logout and login', async () => {
        const addToCartBtn = await $('[data-test="add-to-cart-sauce-labs-backpack"]');
        await addToCartBtn.click();

        const cartBadge = await $('.shopping_cart_badge');
        await cartBadge.waitForDisplayed();
        expect(await cartBadge.getText()).toBe('1');

        const burgerMenu = await $('#react-burger-menu-btn');
        await burgerMenu.waitForClickable();
        await burgerMenu.click();

        await $('#logout_sidebar_link').waitForClickable({ timeout: 2000 });
        const menuItems = await $$('.bm-item');
        expect(menuItems).toHaveLength(4);

        await $('#logout_sidebar_link').click();

        const username = await $('#user-name');
        const password = await $('#password');
        await username.waitForDisplayed();
        expect(await username.getValue()).toBe('');
        expect(await password.getValue()).toBe('');

        await username.setValue('standard_user');
        await password.setValue('secret_sauce');
        await $('#login-button').click();

        const cartLink = await $('.shopping_cart_link');
        await cartLink.waitForClickable();
        await cartLink.click();

        const cartItem = await $('.cart_item');
        await cartItem.waitForDisplayed();
        expect(await $('.cart_item')).toBeDisplayed();
    });
});