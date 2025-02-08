class FooterPage {
    get twitterLink() {
        return $('a[data-test="social-twitter"], a[href*="x.com"]');
    }

    get facebookLink() {
        return $('a[data-test="social-facebook"]');
    }

    get linkedinLink() {
        return $('a[data-test="social-linkedin"], a[href*="linkedin.com"]');
    }

    async checkFooterLink(linkElement) {
        const currentWindow = await browser.getWindowHandle();  

        await linkElement.click();  

        const allHandles = await browser.getWindowHandles(); 
        const newWindow = allHandles.find(handle => handle !== currentWindow);  
        
        if (newWindow) {
            await browser.switchToWindow(newWindow);  

            await browser.waitUntil(async () => {
                const url = await browser.getUrl();
                return url.includes("facebook.com") || url.includes("linkedin.com") || url.includes("x.com");
            }, {
                timeout: 10000, 
                timeoutMsg: 'The page did not load within 10 seconds'
            });

            const currentUrl = await browser.getUrl();
            console.log(`Opened URL: ${currentUrl}`); 
            await browser.closeWindow();  
            await browser.switchToWindow(currentWindow);  
            return currentUrl;
        } else {
            throw new Error('No new window found after clicking the link.');
        }
    }
}

module.exports = new FooterPage();
