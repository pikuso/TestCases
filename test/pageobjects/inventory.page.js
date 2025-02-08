const Page = require("./page");

class InventoryPage extends Page {
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
    console.log("Sort Dropdown:", dropdown);
    return dropdown;
  }

  async logout() {
    const menu = await $(".bm-menu");
    const isMenuOpen = await menu.isDisplayed();

    if (!isMenuOpen) {
      await this.burgerMenu.click();
    }
    await this.logoutButton.click();
  }

  async addToCart() {
    const firstProductButton = await this.addToCartButtons[0];
    await firstProductButton.click();

    const cartCount = await this.getCartItemCount();
    console.log("Cart item count:", cartCount);
  }

  async sortProducts(criteria) {
    await this.sortDropdown.waitForDisplayed({ timeout: 5000 });
    await this.sortDropdown.selectByVisibleText(criteria);
  }

  async getCartItemCount() {
    const badgeText = await this.shoppingCartBadge.getText();
    console.log("Shopping cart badge text:", badgeText);
    return parseInt(badgeText, 10) || 0;
  }

  async getFirstProductName() {
    const firstProductNameElement = await $$(".inventory_item_name");
    return firstProductNameElement.getText();
  }
}

module.exports = new InventoryPage();
