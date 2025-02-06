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

    get overviewProduct() {
        return $('.inventory_item_name');
    }

    get overviewPrice() {
        return $('.summary_subtotal_label');
    }

    async fillCheckoutForm(firstName, lastName, postalCode) {
        await this.firstNameInput.setValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await this.postalCodeInput.setValue(postalCode);
        await this.continueButton.click();
    }

    async verifyCheckoutDetails(productName, productPrice) {
        const items = await this.inventoryItems;

        let productFound = false;
        for (let item of items) {
            const itemName = await item.getText();
            if (itemName.includes(productName)) {
                productFound = true;
                break;  
            }
        }

        if (!productFound) {
            throw new Error(`Product with name "${productName}" was not found in checkout details.`);
        }

        const priceElement = await $( `.summary_subtotal_label` );
        const priceText = await priceElement.getText();
        expect(priceText).toContain(productPrice);  
    }

    async completePurchase() {
        await this.finishButton.click();
    }

    async backHome() {
        const backHomeButton = await $('[data-test="back-to-products"]');
        await backHomeButton.click();
    }
}

module.exports = new CheckoutPage();
