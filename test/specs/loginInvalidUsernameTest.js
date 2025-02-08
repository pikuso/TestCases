//003
const loginPage = require("../pageobjects/login.page");

describe("Sauce Demo Login Test - Invalid Username", () => {
  it("should fail to login with an invalid username and show error indicators", async () => {
    await loginPage.open();
    await loginPage.login("stanarD_user", "secret_sauce");

    expect(await loginPage.errorMessage.isDisplayed()).toBeTruthy();

    expect(await loginPage.errorMessage.getText()).toContain(
      "Epic sadface: Username and password do not match any user in this service"
    );

    expect(await loginPage.errorIconUsername.isDisplayed()).toBeTruthy();
    expect(await loginPage.errorIconPassword.isDisplayed()).toBeTruthy();
  });
});
