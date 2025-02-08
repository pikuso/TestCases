class CheckoutPage {
  get firstNameInput() {
    return $('[data-test="firstName"]');
  }

  get lastNameInput() {
    return $('[data-test="lastName"]');
  }

  get postalCodeInput() {
    return $('[data-test="postalCode"]');
  }

  get continueButton() {
    return $('[data-test="continue"]');
  }

  get finishButton() {
    return $('[data-test="finish"]');
  }

  get inventoryItems() {
    return $$(".inventory_item_name");
  }

  get productPrices() {
    return $$('[data-test="inventory-item-price"]');
  }

  get TotalPrice() {
    return $('[data-test="subtotal-label"]');
  }

  get thankYouMessage() {
    return $('[data-test="complete-header"]');
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

  async getTotalPrice() {
    const totalPriceText = await this.TotalPrice.getText();
    return parseFloat(totalPriceText.replace("Item total: $", "").trim());
  }

  async isCheckoutFormDisplayed() {
    const isFirstNameVisible = await this.firstNameInput.isDisplayed();
    const isLastNameVisible = await this.lastNameInput.isDisplayed();
    const isPostalCodeVisible = await this.postalCodeInput.isDisplayed();
    const isContinueButtonVisible = await this.continueButton.isDisplayed();

    return (
      isFirstNameVisible &&
      isLastNameVisible &&
      isPostalCodeVisible &&
      isContinueButtonVisible
    );
  }

  async fillCheckoutForm(
    firstName = "John",
    lastName = "Doe",
    postalCode = "12345"
  ) {
    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.postalCodeInput.setValue(postalCode);
    await this.continueButton.click();
  }

  async completePurchase() {
    await this.finishButton.click();
  }

  async isThankYouMessageDisplayed() {
    try {
      return await this.thankYouMessage.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  async backHome() {
    const backHomeButton = await $('[data-test="back-to-products"]');
    await backHomeButton.click();
  }
}

module.exports = new CheckoutPage();
