//008
const loginPage = require("../pageobjects/login.page");
const inventoryPage = require("../pageobjects/inventory.page");
const cartPage = require("../pageobjects/cart.page");
const checkoutPage = require("../pageobjects/checkout.page");

const PRODUCT_NAME = 'Sauce Labs Bike Light';

describe("Sauce Demo Logout Test", () => {
  it("should logout successfully and redirect to login page", async () => {
    await loginPage.open();
    await loginPage.login();
    expect(await browser.getUrl()).toContain("inventory.html");

    const price = await inventoryPage.getPriceByName(PRODUCT_NAME);
    await inventoryPage.addToCart(PRODUCT_NAME);
    const cartItemCount = await inventoryPage.getCartItemCount();
    expect(cartItemCount).toBe(1);

    await cartPage.openCart();
    await checkoutPage.verifyProductInCheckout(PRODUCT_NAME);
    await cartPage.proceedToCheckout();
    expect(await checkoutPage.getCheckForm.isDisplayed()).toBeTruthy();

    await checkoutPage.fillCheckoutForm();
    await checkoutPage.verifyProductInCheckout(PRODUCT_NAME);

    const expectedTotal = await checkoutPage.getTotalPriceFromOverview(); 
    expect(expectedTotal).toBe(price.replace('$', ''));  

    await checkoutPage.completePurchase();    
    expect(await checkoutPage.isThankYouMessageDisplayed()).toBe(true);

    await checkoutPage.backHome();
    expect(await cartPage.isCartEmpty()).toBeTruthy();
  });
});
