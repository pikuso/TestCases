const loginPage = require('../pageobjects/login.page');
const cartPage = require('../pageobjects/cart.page');
const checkoutPage = require('../pageobjects/checkout.page');
const inventoryPage = require('../pageobjects/inventory.page');

describe('Sauce Demo Valid Checkout Test', () => {
    let productName, productPrice;

    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('should complete checkout process successfully', async () => {
        await inventoryPage.addProductToCart('sauce-labs-backpack');
        
        productName = 'Sauce Labs Backpack';  
        productPrice = '$29.99';  
        await cartPage.openCart();
        await cartPage.verifyCartItem(productName);  
        await cartPage.verifyCartCount(1);

        await cartPage.proceedToCheckout();

        await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');

        await checkoutPage.verifyCheckoutDetails(productName, productPrice);

        await checkoutPage.completePurchase();

        await checkoutPage.backHome();
    });
});
