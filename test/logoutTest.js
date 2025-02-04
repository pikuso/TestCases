describe('Sauce Demo Logout Test', () => {
    beforeEach(async () => {
        await browser.url("saucedemo.com");

        const usernameInput = await $('#user-name');
        await usernameInput.setValue('standard_user');

        const passwordInput = await $('#password');
        await passwordInput.setValue('secret_sauce');

        const loginButton = await $('#login-button');
        await loginButton.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            {
                timeout: 5000,
                timeoutMsg: 'Не перешли на страницу инвентаря',
            }
        );

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');
    });

    it('should logout successfully and redirect to login page', async () => {
        const burgerButton = await $('#react-burger-menu-btn');
        await burgerButton.click();

        const menu = await $('.bm-menu-wrap');
        await expect(menu).toBeDisplayed();

        const menuItems = await $$('.bm-item-list a');
        expect(menuItems.length).toBe(4);

        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('saucedemo.com'),
            {
                timeout: 5000,
                timeoutMsg: 'Ожидали переход на страницу логина, но не произошло',
            }
        );

        const usernameInput = await $('#user-name');
        const passwordInput = await $('#password');
        expect(await usernameInput.getValue()).toBe('');
        expect(await passwordInput.getValue()).toBe('');
    });
});
