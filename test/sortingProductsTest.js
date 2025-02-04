describe('Sauce Demo Sorting Test', () => {
    beforeEach(async () => {
        await browser.url('saucedemo.com');

        const usernameInput = await $('#user-name');
        await usernameInput.setValue('standard_user');

        const passwordInput = await $('#password');
        await passwordInput.setValue('secret_sauce');

        const loginButton = await $('#login-button');
        await loginButton.click();

        await expect(await browser.getUrl()).toContain('/inventory.html');
    });

    it('should correctly sort products based on selected criteria', async () => {
        const sortingDropdown = await $('.product_sort_container');

        await sortingDropdown.selectByVisibleText('Price (low to high)');
        await browser.pause(1000); 

        const priceElements = await $$('.inventory_item_price');

        const priceValues = [];
        for (const priceElement of priceElements) {
            const text = await priceElement.getText();
            const price = parseFloat(text.replace('$', ''));
            priceValues.push(price);
        }

        const sortedPrices = [...priceValues].sort((a, b) => a - b);
        expect(priceValues).toEqual(sortedPrices);
    });
});
