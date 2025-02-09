//005
const loginPage = require("../pageobjects/login.page");
const inventoryPage = require("../pageobjects/inventory.page");
const cartPage = require("../pageobjects/cart.page");

describe("Sauce Demo Cart Persistence Test", () => {
  it("should maintain products in cart after logout and login", async () => {
    await loginPage.open();
    await loginPage.login();
    expect(await browser.getUrl()).toContain("inventory.html");

    const cartCountBefore = await inventoryPage.getCartItemCount();
    expect(cartCountBefore).toBe(0);
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    const cartCountAfter = await inventoryPage.getCartItemCount();
    expect(cartCountAfter).toBe(1);

    await inventoryPage.burgerMenu.click();
    const menuItems = await inventoryPage.menuItems;
    expect(menuItems.length).toBe(4);

    await inventoryPage.logout();
    expect(await loginPage.inputUsername.getValue()).toBe("");
    expect(await loginPage.inputPassword.getValue()).toBe("");

    await loginPage.login();

    const cartItemCountAfterLogin = await inventoryPage.getCartItemCount();
    expect(cartItemCountAfterLogin).toBe(1);
  });
});
