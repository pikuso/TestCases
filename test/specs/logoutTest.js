//004
const loginPage = require("../pageobjects/login.page");
const inventoryPage = require("../pageobjects/inventory.page");

describe("Sauce Demo Logout Test", () => {
  it("should logout successfully and redirect to login page", async () => {
    await loginPage.open();
    await loginPage.login();

    expect(await browser.getUrl()).toContain("inventory.html");

    await inventoryPage.burgerMenu.click();
    const menuItems = await inventoryPage.menuItems;
    expect(menuItems.length).toBe(4);

    await inventoryPage.logout();

    expect(await loginPage.loginForm.isDisplayed()).toBeTruthy();

    expect(await loginPage.inputUsername.getValue()).toBe("");
    expect(await loginPage.inputPassword.getValue()).toBe("");
  });
});
