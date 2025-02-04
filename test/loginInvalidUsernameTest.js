describe('Sauce Demo Login Test - Invalid Username', () => {
    it('should fail to login with an invalid username and show error indicators', async () => {
        await browser.url("saucedemo.com");

        const usernameInput = await $('#user-name');
        await usernameInput.setValue('standarD_user'); 
        expect(await usernameInput.getValue()).toBe('standarD_user');

        const passwordInput = await $('#password');
        await passwordInput.setValue('secret_sauce'); 
        const passwordType = await passwordInput.getAttribute('type');
        expect(passwordType).toBe('password'); 
        const loginButton = await $('#login-button');
        await loginButton.click();

        const errorMessage = await $('.error-message-container h3');
        await expect(errorMessage).toBeDisplayed();
        await expect(errorMessage.getText()).resolves.toContain(
            'Epic sadface: Username and password do not match any user in this service'
        );

        await browser.pause(1000); 

        const errorIconUsername = await $('#user-name + svg');
        const errorIconPassword = await $('#password + svg');

        await expect(errorIconUsername).toBeDisplayed();
        await expect(errorIconPassword).toBeDisplayed();
    });
});
