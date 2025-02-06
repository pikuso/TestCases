const Page = require('./page');

class InventoryPage extends Page {
    get burgerMenu() {
        return $('#react-burger-menu-btn'); 
    }

    get logoutButton() {
        return $('#logout_sidebar_link'); 
    }

    async logout() {
        await this.burgerMenu.click();   
        await this.logoutButton.click(); 
    }

    async addToCart() {
        const firstProductButton = await this.addToCartButtons[0]; 
        await firstProductButton.click();  
    }

    get inventoryList() {
        const list = $$('.inventory-item');  
        console.log('Inventory list:', list); 
        return list;
    }    

    get cartIcon() {
        return $('.shopping_cart_link'); 
    }

    get sortDropdown() {
        const dropdown = $('[data-test="product-sort-container"]');
        console.log('Sort Dropdown:', dropdown);  
        return dropdown;
    }    

    get priceElements() {
        return $$('.inventory-item-price'); 
    }

    async sortProducts(criteria) {
        await this.sortDropdown.waitForDisplayed({ timeout: 5000 }); 
        await this.sortDropdown.selectByVisibleText(criteria);  
    }

    get addToCartButtons() {
        return $$('[data-test^="add-to-cart-"]');  
    }

    async addProductToCart() {
        const firstProductButton = await this.addToCartButtons[0]; 
        await firstProductButton.waitForExist({ timeout: 5000 });  
        await firstProductButton.click();  
    }

    async getProductPrices() {
        const priceElements = await this.priceElements;
        const prices = await Promise.all(priceElements.map(async (priceElement) => {
            const priceText = await priceElement.getText();
            return parseFloat(priceText.replace('$', '').trim());  
        }));
        return prices;
    }

    async getProductNames() {
        const nameElements = await $$('.inventory_item_name');
        const names = await Promise.all(nameElements.map(async (nameElement) => {
            return await nameElement.getText();
        }));
        return names;
    }
}

module.exports = new InventoryPage();
