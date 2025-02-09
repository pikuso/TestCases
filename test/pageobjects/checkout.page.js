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

  get getCheckForm() {
    return $(".checkout_info");
  } 

  async verifyProductInOverview(productName) {
    const cartItemText = await (await $('.cart_item .inventory_item_name')).getText();
    if (cartItemText !== productName) {
        throw new Error(`Expected "${productName}", found "${cartItemText}"`);
    }

    const overviewItemText = await (await $('.cart_item .inventory_item_name')).getText();
    if (overviewItemText !== productName) {
        throw new Error(`Expected "${productName}" in Overview, found "${overviewItemText}"`);
    }
}

async getTotalPriceFromOverview() {
  const priceElements = await $$('.inventory_item_price'); 
  let total = 0;

  for (let priceElement of priceElements) {
      const priceText = await priceElement.getText();
      total += parseFloat(priceText.replace("$", "").trim());
  }

  return total;
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
