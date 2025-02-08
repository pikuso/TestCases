//002
const loginPage = require("../pageobjects/login.page");

describe("Sauce Demo Login Test - Invalid Password", () => {
  it("should fail to login with an invalid password and show error indicators", async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "wrong_password");

    expect(await loginPage.errorMessage.isDisplayed()).toBeTruthy();

    expect(await loginPage.errorMessage.getText()).toContain(
      "Epic sadface: Username and password do not match any user in this service"
    );

    expect(await loginPage.errorIconUsername.isDisplayed()).toBeTruthy();
    expect(await loginPage.errorIconPassword.isDisplayed()).toBeTruthy();
  });
});
