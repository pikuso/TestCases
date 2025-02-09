//008
const loginPage = require("../pageobjects/login.page");
const inventoryPage = require("../pageobjects/inventory.page");
const cartPage = require("../pageobjects/cart.page");
const checkoutPage = require("../pageobjects/checkout.page");

describe("Sauce Demo Logout Test", () => {
  it("should logout successfully and redirect to login page", async () => {
    await loginPage.open();
    await loginPage.login();
    expect(await browser.getUrl()).toContain("inventory.html");

    await inventoryPage.addToCart('Sauce Labs Bike Light');
    const cartItemCount = await inventoryPage.getCartItemCount();
    expect(cartItemCount).toBe(1);

    await cartPage.openCart();
    await cartPage.proceedToCheckout();
    expect(await checkoutPage.getCheckForm.isDisplayed()).toBeTruthy();

    await checkoutPage.fillCheckoutForm();
    await checkoutPage.verifyProductInOverview('Sauce Labs Bike Light');

    const expectedTotal = await checkoutPage.getTotalPriceFromOverview(); 
    expect(expectedTotal).toBe(expectedTotal);  

    await checkoutPage.completePurchase();
    const isThankYouMessageDisplayed =
    await checkoutPage.isThankYouMessageDisplayed();
    expect(isThankYouMessageDisplayed).toBe(true);

    await checkoutPage.backHome();
    const isCartEmpty = await cartPage.isCartEmpty();
    await cartPage.isCartEmpty();
  });
});
