//007
const loginPage = require("../pageobjects/login.page");
const footerPage = require("../pageobjects/footer.page");

describe("Sauce Demo Footer Links Test", () => {
  before(async () => {
    await loginPage.open();
    await loginPage.loginWithDefaultCredentials();
    await expect(await browser.getUrl()).toContain("/inventory.html");
  });

  it("should open Twitter (X) link in a new tab", async () => {
    const url = await footerPage.checkFooterLink(footerPage.twitterLink);
    expect(url).toContain("x.com");
  });

  it("should open Facebook link in a new tab", async () => {
    const url = await footerPage.checkFooterLink(footerPage.facebookLink);
    expect(url).toContain("facebook.com");
  });

  it("should open LinkedIn link in a new tab", async () => {
    const url = await footerPage.checkFooterLink(footerPage.linkedinLink);
    expect(url).toContain("linkedin.com");
  });
});
