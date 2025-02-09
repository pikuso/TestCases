const Page = require("./page");

class InventoryPage extends Page {
  get inventoryItems() {
    return $$('[data-test="inventory-item"]');
  }

  get burgerMenu() {
    return $("#react-burger-menu-btn");
  }

  get addToCartButtons() {
    return $$('[data-test^="add-to-cart-"]');
  }

  get menuItems() {
    return $$(".bm-item-list .bm-item");
  }

  get logoutButton() {
    return $("#logout_sidebar_link");
  }

  get shoppingCartBadge() {
    return $(".shopping_cart_badge");
  }

  get inventoryList() {
    const list = $$(".inventory-item");
    console.log("Inventory list:", list);
    return list;
  }

  get cartIcon() {
    return $(".shopping_cart_link");
  }

  get sortDropdown() {
    const dropdown = $('[data-test="product-sort-container"]');
    return dropdown;
  }

  async selectSortOption(option) {
    await this.sortDropdown.waitForDisplayed();
    await this.sortDropdown.selectByVisibleText(option);
  }

  async getPrices() {
    const priceElements = await this.productPrices;
    if (priceElements.length === 0) {
      throw new Error("No price elements found!");
    }
    return Promise.all(priceElements.map(async (el) => {
      const text = await el.getText();
      return parseFloat(text.replace('$', '').trim());
    }));
  }

  async logout() {
    const menu = await $(".bm-menu");
    const isMenuOpen = await menu.isDisplayed();

    if (!isMenuOpen) {
      await this.burgerMenu.click();
    }
    await this.logoutButton.click();
  }

  async addToCart(productName) {
    const product = productName.toLowerCase().replace(/ /g, '-');
    const productId = `add-to-cart-${product}`;
    const productButton = await $(`button[data-test="${productId}"]`);
    
    await productButton.click();
  }

  async sortProducts(criteria) {
    await this.sortDropdown.waitForDisplayed({ timeout: 5000 });
    await this.sortDropdown.selectByVisibleText(criteria);
  }

  async getCartItemCount() {
    if(!await this.shoppingCartBadge.isDisplayed()){
      return 0;
    }
    const badgeText = await this.shoppingCartBadge.getText();
    console.log("Shopping cart badge text:", badgeText);
    return parseInt(badgeText, 10) || 0;
  }

  async getFirstProductName() {
    const firstProductNameElement = await $$(".inventory_item_name");
    return firstProductNameElement.getText();
  }

  getItemPriceXpath(itemName) {
    return `//div[@class="inventory_item" and .//button[@data-test="add-to-cart-${itemName.toLowerCase().replace(/ /g, '-')}"]]//div[@class="inventory_item_price"]`;
}
//div[@class="inventory_item" and .//button[@data-test="add-to-cart-sauce-labs-backpack"]]//div[@class="inventory_item_price"]

  async getPriceByName(itemName) {
    const xpath = this.getItemPriceXpath(itemName);
    const priceElement = await $(xpath);
    
    return await priceElement.getText();
}
}

module.exports = new InventoryPage();
