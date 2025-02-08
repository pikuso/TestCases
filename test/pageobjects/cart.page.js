const Page = require("./page");

class CartPage extends Page {
  get cartButton() {
    return $(".shopping_cart_link");
  }

  get checkoutButton() {
    return $(".checkout_button");
  }

  get cartItemCount() {
    return $(".cart_quantity");
  }

  get cartIcon() {
    return $(".shopping_cart_link");
  }

  get cartItems() {
    return $$(".cart_item");
  }

  get totalPriceLabel() {
    return $('[data-test="total-label"]');
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async verifyCartCount(expectedCount) {
    const items = await this.cartItems;
    expect(items.length).toBe(expectedCount);
  }

  async verifyCartContents(expectedProduct) {
    const items = await this.cartItems;
    if (items.length === 0) {
      return false;
    }
    const firstItemName = await items[0].$(".inventory_item_name").getText();
    return firstItemName === expectedProduct;
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async isCartEmpty() {
    const items = await this.cartItems;
    return items.length === 0;
  }

  async getProductsAndPrices() {
    const products = [];
    const inventoryItems = await $$(".inventory_item_name");
    const productPrices = await $$(".inventory_item_price");

    for (let i = 0; i < inventoryItems.length; i++) {
      const name = await inventoryItems[i].getText();
      const price = await productPrices[i].getText();
      products.push({ name, price });
    }

    return products;
  }
}

module.exports = new CartPage();
