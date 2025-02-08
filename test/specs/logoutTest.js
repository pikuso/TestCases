//004
const loginPage = require("../pageobjects/login.page");
const inventoryPage = require("../pageobjects/inventory.page");

describe("Sauce Demo Logout Test", () => {
  it("should logout successfully and redirect to login page", async () => {
    await loginPage.open();
    await loginPage.loginWithDefaultCredentials();

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("inventory.html");

    await inventoryPage.burgerMenu.click();
    const menuItems = await inventoryPage.menuItems;
    expect(menuItems.length).toBe(4);

    await inventoryPage.logout();

    const newUrl = await browser.getUrl();
    expect(newUrl).toContain("saucedemo.com");

    expect(await loginPage.inputUsername.getValue()).toBe("");
    expect(await loginPage.inputPassword.getValue()).toBe("");
  });
});
