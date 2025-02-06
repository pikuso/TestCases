const inventoryPage = require('../pageobjects/inventory.page');

describe('Product sorting test', () => {
    const sortOptions = [
        'Name (A to Z)', 
        'Name (Z to A)', 
        'Price (low to high)', 
        'Price (high to low)'
    ];

    sortOptions.forEach((option) => {
        it(`should correctly sort products based on "${option}"`, async () => {
            const inventoryItems = await $$('[data-test="inventory-item"]');
            console.log('Inventory Items:', inventoryItems);

            if (inventoryItems.length === 0) {
                console.log('No inventory items found!');
                return;  
            }

            try {
                await inventoryItems[0].waitForDisplayed({ timeout: 5000 });
            } catch (error) {
                console.error('Error waiting for item to be displayed:', error);
            }

            await inventoryPage.sortProducts(option);

            try {
                await inventoryItems[0].waitForDisplayed({ timeout: 5000 });
            } catch (error) {
                console.error('Error waiting for sorted item to be displayed:', error);
            }

            if (option.includes('Price')) {
                const priceElements = await $$('[data-test="inventory-item-price"]');
                const priceValues = await Promise.all(priceElements.map(async (el) => {
                    const priceText = await el.getText();
                    return parseFloat(priceText.replace('$', '').trim());
                }));

                console.log('Prices:', priceValues);

                const sortedPrices = option.includes('low to high') ? 
                    [...priceValues].sort((a, b) => a - b) : 
                    [...priceValues].sort((a, b) => b - a);

                expect(priceValues).toEqual(sortedPrices);
            } else {
                const productNameElements = await $$('[data-test="inventory-item-name"]');
                const productNames = await Promise.all(productNameElements.map(async (el) => {
                    return await el.getText();
                }));

                console.log('Product Names:', productNames);

                const sortedNames = option.includes('A to Z') ? 
                    [...productNames].sort() : 
                    [...productNames].sort().reverse();

                expect(productNames).toEqual(sortedNames);
            }
        });
    });
});
