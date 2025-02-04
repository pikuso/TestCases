describe('Sauce Demo Footer Links Test', () => {
    before(async () => {
        await browser.url('saucedemo.com/');

        const usernameInput = await $('#user-name');
        await usernameInput.setValue('standard_user');

        const passwordInput = await $('#password');
        await passwordInput.setValue('secret_sauce');

        const loginButton = await $('#login-button');
        await loginButton.click();

        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('inventory.html');
        }, { timeout: 10000, timeoutMsg: 'Login failed: inventory page did not load' });

        expect(await browser.getUrl()).toContain('inventory.html');
    });

    async function testFooterLink(selector, expectedUrlPart) {
        const footerLink = await $(selector);

        await footerLink.waitForExist({ timeout: 10000 });
        await footerLink.waitForDisplayed({ timeout: 10000 });

        await footerLink.click();

        await browser.waitUntil(async () => {
            return (await browser.getWindowHandles()).length > 1;
        }, { timeout: 10000, timeoutMsg: 'New tab did not open' });

        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain(expectedUrlPart);

        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    }

    it('should open Twitter (X) link in a new tab', async () => {
        await testFooterLink('a[href*="twitter.com"], a[href*="x.com"]', 'x.com');
    });

    it('should open Facebook link in a new tab', async () => {
        await testFooterLink('a[href*="facebook.com"]', 'facebook.com');
    });

    it('should open LinkedIn link in a new tab', async () => {
        await testFooterLink('a[href*="linkedin.com"]', 'linkedin.com');
    });
});
