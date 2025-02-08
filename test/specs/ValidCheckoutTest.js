//008
const loginPage = require("../pageobjects/login.page");
const inventoryPage = require("../pageobjects/inventory.page");
const inventoryPage = require("../pageobjects/cart.page");
const cartPage = require("../pageobjects/cart.page");
const checkoutPage = require("../pageobjects/checkout.page");

describe("Sauce Demo Logout Test", () => {
  it("should logout successfully and redirect to login page", async () => {
    await loginPage.open();
    await loginPage.loginWithDefaultCredentials();

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("inventory.html");

    await inventoryPage.addToCart();
    const cartItemCount = await inventoryPage.getCartItemCount();
    expect(cartItemCount).toBe(1);

    await cartPage.openCart();
    await cartPage.verifyCartContents(); 
    await cartPage.proceedToCheckout();

    const isFormVisible = await checkoutPage.isCheckoutFormDisplayed();
    expect(isFormVisible).toBe(true);

    await checkoutPage.fillCheckoutForm();
    //Products from step 1 is displayed. Total price = price of products from step 1

    await checkoutPage.completePurchase();
    //User is redirected to the "Checkout Complete" page, "Thank you for your order!" message are displayed

    await checkoutPage.backHome();
    //User is redirected to the inventory page. Products are displayed. Cart is empty
    await cartPage.isCartEmpty();
  });
});
