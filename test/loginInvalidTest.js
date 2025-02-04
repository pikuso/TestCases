describe("Sauce Demo Login Test - Invalid Password", () => {
  it("should fail to login with an invalid password and show error indicators", async () => {
    await browser.url("saucedemo.com");

    const usernameInput = await $("#user-name");
    await usernameInput.setValue("standard_user");
    expect(await usernameInput.getValue()).toBe("standard_user");

    const passwordInput = await $("#password");
    await passwordInput.setValue("random_invalid_password");
    const passwordType = await passwordInput.getAttribute("type");
    expect(passwordType).toBe("password");

    const loginButton = await $("#login-button");
    await loginButton.click();

    const errorMessage = await $(".error-message-container h3");
    await expect(errorMessage).toBeDisplayed();
    await expect(errorMessage.getText()).resolves.toContain(
      "Epic sadface: Username and password do not match any user in this service"
    );

    await browser.pause(1000);
  });
});
