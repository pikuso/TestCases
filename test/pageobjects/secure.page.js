const { $ } = require('@wdio/globals');
const Page = require('./page');

class SecurePage extends Page {
    get flashAlert() {
        return $('#flash');
    }

    get burgerMenuButton() {
        return $('#react-burger-menu-btn');
    }

    get logoutButton() {
        return $('#logout_sidebar_link');
    }

    async logout() {
        await this.burgerMenuButton.click();
        await this.logoutButton.click();
    }
}

module.exports = new SecurePage();
