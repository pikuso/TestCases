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
        return $$('.inventory_item_name');  
    }

    get TotalPrice() {
        return $('[data-test="total-label"]');
    }

    async fillCheckoutForm(firstName = 'John', lastName = 'Doe', postalCode = '12345') {
        await this.firstNameInput.setValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await this.postalCodeInput.setValue(postalCode);
        await this.continueButton.click();
    }

    async completePurchase() {
        await this.finishButton.click();
    }

    async backHome() {
        const backHomeButton = await $('[data-test="back-to-products"]');
        await backHomeButton.click();
    }
    // async verifyCheckoutDetails(productPrice) {
    //     // Получаем общую цену из корзины
    //     const totalPriceElement = await this.totalPriceLabel;
    //     const totalPriceText = await totalPriceElement.getText();
    
    //     // Форматируем цену продукта и проверяем, совпадает ли она с общей ценой
    //     const expectedTotalPrice = `$${productPrice.toFixed(2)}`;
    
    //     if (totalPriceText !== expectedTotalPrice) {
    //         throw new Error(`Expected total price "${expectedTotalPrice}" but found "${totalPriceText}"`);
    //     }
    // }
}

module.exports = new CheckoutPage();
