// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');

// SauceLabs environment variables
var userName,
    accessKey;

function createDriver(testTitle) {
    // Retrieve the userName and accessKey from the environment
    userName = process.env.SAUCE_USERNAME;
    accessKey = process.env.SAUCE_ACCESS_KEY;
    var sauceLabsUrl = "http://" + userName + ":" + accessKey + "@ondemand.saucelabs.com:80/wd/hub";

    // We declare that we want to run the test on Chrome + Linux
    var desiredCaps = {
        'browserName': webDriver.Browser.CHROME,
        'platform': 'LINUX',
        'username': userName,
        'accessKey': accessKey,
        'name': testTitle
    };

    // Create the connection through WebDriver to the Selenium Grid
     var driver = new webDriver.Builder()
        .withCapabilities(desiredCaps)
        .usingServer(sauceLabsUrl)
        .build();

    driver.manage().window().maximize();
    return driver;
}


exports.createDriver = createDriver;