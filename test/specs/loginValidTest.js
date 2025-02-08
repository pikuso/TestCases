//001
const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');

describe('Sauce Demo Login Test - Valid Login', () => {
    it('should login successfully and check inventory page', async () => {
        await loginPage.open();
        await loginPage.loginWithDefaultCredentials();

        expect(await browser.getUrl()).toContain('inventory.html');

        expect(await inventoryPage.cartIcon.isDisplayed()).toBeTruthy();

        await inventoryPage.inventoryList;
        expect(inventoryPage.inventoryList.isDisplayed()).toBeTruthy();
    });
});
