const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');

describe('Sauce Demo Login Test - Valid Login', () => {
    it('should login successfully and check inventory page', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        expect(await browser.getUrl()).toContain('inventory.html');

        expect(await inventoryPage.cartIcon.isDisplayed()).toBeTruthy();
    });
});
