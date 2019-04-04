import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import chromedriver from 'chromedriver';




const fs = require('fs');
describe('test google.com', () => {
    const {
        Builder,
        By,
        Key,
        until
    } = require('selenium-webdriver');
    var driver;
 
    beforeEach(() => {

	chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
        driver = new iwebdriver.Builder()
		 .withCapabilities(webdriver.Capabilities.chrome())
                 .build();
    });
 
    afterEach(() => {
        driver.quit();
    });
 
    it('should open google search', async () => {
        await driver.get('http://www.google.com.mx');
        driver
            .getTitle()
            .then(title => {
                expect(title).toEqual('Google');
            });
    });
 
    it('should open google search and view search results', async () => {
        await driver.get('http://www.google.com.mx');
        var element = await driver.findElement(By.css('input[title=Search]'));
        await element.sendKeys("selenium", Key.RETURN);
        await driver.wait(until.titleContains("selenium"), 4000);
        driver
            .getTitle()
            .then(title => {
                expect(title).toEqual('selenium - Google Search');
            });
    });
 
    it('should open google search and do image search', async () => {
        await driver.get('http://www.google.com.mx');
        var element = await driver.findElement(By.css('input[title=Search]'));
        await element.sendKeys("selenium", Key.RETURN);
        await driver.wait(until.titleContains("selenium"), 4000);
        var imageSearch = driver.findElement(By.xpath("//a[contains(text(), 'Images')]"));
        await imageSearch.click();
        let image = await driver.takeScreenshot();
        fs.writeFileSync('out.png', image, 'base64');
 
    });
 
});
