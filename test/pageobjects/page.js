const { browser } = require('@wdio/globals');

module.exports = class Page {
    /**
     * 
     * @param path 
     */
    open(path) {
        const baseUrl = 'saucedemo.com';
        return browser.url(`${baseUrl}${path}`);
    }
}
