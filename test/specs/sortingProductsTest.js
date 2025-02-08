//006
const inventoryPage = require("../pageobjects/inventory.page");

describe("Product sorting test", () => {
  const sortOptions = [
    "Name (A to Z)",
    "Name (Z to A)",
    "Price (low to high)",
    "Price (high to low)",
  ];

  sortOptions.forEach((option) => {
    it(`should correctly sort products based on "${option}"`, async () => {
      const inventoryItems = await $$('[data-test="inventory-item"]');
      if (inventoryItems.length === 0) {
        console.log("No inventory items found!");
        return;
      }

      await inventoryPage.sortProducts(option);

      await inventoryItems[0].waitForDisplayed({ timeout: 5000 });

      if (option.includes("Price")) {
        const priceElements = await $$('[data-test="inventory-item-price"]');
        const priceValues = await Promise.all(
          priceElements.map((el) =>
            el
              .getText()
              .then((text) => parseFloat(text.replace("$", "").trim()))
          )
        );

        const sortedPrices = [...priceValues].sort((a, b) =>
          option.includes("low to high") ? a - b : b - a
        );
        expect(priceValues).toEqual(sortedPrices);
      } else {
        const productNameElements = await $$(
          '[data-test="inventory-item-name"]'
        );
        const productNames = await Promise.all(
          productNameElements.map((el) => el.getText())
        );

        const sortedNames = [...productNames].sort();
        if (option.includes("Z to A")) {
          sortedNames.reverse();
        }

        expect(productNames).toEqual(sortedNames);
      }
    });
  });
});
