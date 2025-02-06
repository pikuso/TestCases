const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');

describe('Sauce Demo Logout Test', () => {
    beforeEach(async () => {
        await loginPage.open(); 
        await loginPage.login('standard_user', 'secret_sauce');  

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');
    });

    it('should logout successfully and redirect to login page', async () => {
        await inventoryPage.logout();  

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('saucedemo.com');

        expect(await loginPage.inputUsername.getValue()).toBe('');
        expect(await loginPage.inputPassword.getValue()).toBe('');
    });
});
