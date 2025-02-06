const loginPage = require('../pageobjects/login.page');

describe('Sauce Demo Login Test - Invalid Password', () => {
    it('should show error for invalid password', async () => {
        await loginPage.open();  
        
        await loginPage.login('standard_user', 'wrong_password');  

        expect(await browser.getUrl()).not.toContain('inventory.html');

        expect(await loginPage.errorMessage.isDisplayed()).toBeTruthy();

        expect(await loginPage.errorIconPassword.isDisplayed()).toBeTruthy();
    });
});
