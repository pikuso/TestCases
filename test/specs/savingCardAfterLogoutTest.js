const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');
const cartPage = require('../pageobjects/cart.page');

describe('Sauce Demo Cart Persistence Test', () => {
    before(async () => {
        await loginPage.open();  
        await loginPage.login('standard_user', 'secret_sauce');  
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');  
    });

    it('should maintain products in cart after logout and login', async () => {
        await inventoryPage.addProductToCart('sauce-labs-backpack');  

        await cartPage.openCart();
        await cartPage.verifyCartCount(1);

        await inventoryPage.logout();
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('saucedemo.com');  

        await loginPage.login('standard_user', 'secret_sauce');

        await cartPage.openCart();
        await cartPage.verifyCartCount(1);  

        const productName = "Sauce Labs Backpack";  
        await cartPage.verifyCartItemIsDisplayed(productName);  
    });
});
