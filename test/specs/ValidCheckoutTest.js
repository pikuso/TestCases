//008
const loginPage = require("../pageobjects/login.page");
const inventoryPage = require("../pageobjects/inventory.page");
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
    const addedProducts = await cartPage.getProductsAndPrices();

    await cartPage.proceedToCheckout();

    const isFormVisible = await checkoutPage.isCheckoutFormDisplayed();
    expect(isFormVisible).toBe(true);

    await checkoutPage.fillCheckoutForm();
    const productsOnOverview = await checkoutPage.getProductsAndPrices();
    expect(productsOnOverview).toEqual(addedProducts);

    const totalPrice = await checkoutPage.getTotalPrice();
    const expectedTotal = addedProducts.reduce(
      (sum, item) => sum + parseFloat(item.price.replace("$", "")),
      0
    );
    expect(totalPrice).toBe(expectedTotal);

    await checkoutPage.completePurchase();
    const isThankYouMessageDisplayed =
      await checkoutPage.isThankYouMessageDisplayed();
    expect(isThankYouMessageDisplayed).toBe(true);

    await checkoutPage.backHome();
    const isCartEmpty = await cartPage.isCartEmpty();
    await cartPage.isCartEmpty();
  });
});
