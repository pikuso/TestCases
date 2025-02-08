//005
const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');
const cartPage = require('../pageobjects/cart.page');

describe('Sauce Demo Cart Persistence Test', () => {
    it('should maintain products in cart after logout and login', async () => {
        await loginPage.open();  
        await loginPage.loginWithDefaultCredentials();
        expect(await browser.getUrl()).toContain('inventory.html');  

        await inventoryPage.addToCart();   

        await inventoryPage.burgerMenu.click(); 
        const menuItems = await inventoryPage.menuItems;
        expect(menuItems.length).toBe(4);  

        await inventoryPage.logout();  
        expect(await loginPage.inputUsername.getValue()).toBe('');
        expect(await loginPage.inputPassword.getValue()).toBe('');

        await loginPage.loginWithDefaultCredentials();

        const cartItemCountAfterLogin = await inventoryPage.getCartItemCount();
    console.log("Cart item count after login:", cartItemCountAfterLogin);
    expect(cartItemCountAfterLogin).toBe(1);
    });
});

