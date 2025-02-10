//006
const loginPage = require("../pageobjects/login.page");
const inventoryPage = require("../pageobjects/inventory.page");

describe("Product sorting test", () => {
  before(async () => {
    await loginPage.open();
    await loginPage.login();
    await expect(await browser.getUrl()).toContain("/inventory.html");
  });

  const validateNameSort = async (sortOption, sortFn) => {
    await inventoryPage.sortProducts(sortOption);
    const products = await inventoryPage.getAllProductNames();
    const sortedProducts = sortFn(products);
    expect(products).toEqual(sortedProducts);
  };

  const validatePriceSort = async (sortOption, sortFn) => {
    await inventoryPage.sortProducts(sortOption);
    const products = await inventoryPage.getAllProductNames();
    const prices = await Promise.all(
      products.map((product) => inventoryPage.getPriceByName(product))
    );
    const numericPrices = prices.map((price) => parseFloat(price.replace("$", "")));
    const sortedPrices = sortFn(numericPrices);
    expect(numericPrices).toEqual(sortedPrices);
  };

  it("should correctly sort products based on 'Name (A to Z)'", async () => {
    await validateNameSort("Name (A to Z)", (products) => [...products].sort());
  });

  it("should correctly sort products based on 'Name (Z to A)'", async () => {
    await validateNameSort("Name (Z to A)", (products) => [...products].sort().reverse());
  });

  it("should correctly sort products based on 'Price (low to high)'", async () => {
    await validatePriceSort("Price (low to high)", (prices) =>
      [...prices].sort((a, b) => a - b)
    );
  });
  
  it("should correctly sort products based on 'Price (high to low)'", async () => {
    await validatePriceSort("Price (high to low)", (prices) =>
      [...prices].sort((a, b) => b - a)
    );
  });
});
