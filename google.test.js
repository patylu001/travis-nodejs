let webdriver = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let chromedriver = require('chromedriver');


const fs = require('fs');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
describe('test google.com', () => {
    const {
        Builder,
        By,
        Key,
        until
    } = require('selenium-webdriver');
    var driver;
 
    beforeEach(() => {
	jest.setTimeout(30000);
        driver = new webdriver.Builder()
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
        var element = await driver.findElement(By.name('q'));
        await element.sendKeys("selenium", Key.RETURN);
        await driver.wait(until.titleContains("selenium"), 4000);
        driver
            .getTitle()
            .then(title => {
                //expect(title).toEqual('selenium - Buscar con Google');
                expect(title).toEqual('selenium - Google Search');
            });
    });
 
    it('should open google search and do image search', async () => {
        await driver.get('http://www.google.com.mx');
        var element = await driver.findElement(By.name('q'));
        await element.sendKeys("selenium", Key.RETURN);
        await driver.wait(until.titleContains("selenium"), 5000);
        var imageSearch = driver.findElement(By.xpath("//*[@id='hdtb-msb-vis']/div[2]/a"));
        await imageSearch.click();
        let image = await driver.takeScreenshot();
        fs.writeFileSync('out.png', image, 'base64');
 
    });
 
});
