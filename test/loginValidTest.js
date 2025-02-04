describe('Sauce Demo Login Test - Valid Login', () => {
    it('should login successfully and check inventory page', async () => {
        await browser.url("saucedemo.com")

        const usernameInput = await $('#user-name');
        await usernameInput.setValue('standard_user');

        const passwordInput = await $('#password');
        await passwordInput.setValue('secret_sauce');

        const passwordType = await passwordInput.getAttribute('type');
        expect(passwordType).toBe('password')

        const loginButton = await $('#login-button');
        await loginButton.click();

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');

        const inventoryList = await $$('.inventory_item');
        expect(inventoryList.length).toBeGreaterThan(0);

        const cartIcon = await $('.shopping_cart_link');
        await expect(cartIcon).toBeDisplayed();
    })
})
