// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');

function createDriver(testTitle) {
    // Retrieve the userName and accessKey from the environment
    var seleniumGridUrl = "http://localhost:4444/wd/hub";

    // We declare that we want to run the test on Chrome + Linux
    var desiredCaps = {
        'browserName': process.env.BROWSER,
        'platform': process.env.PLATFORM,
        'name': testTitle
    };

    // Create the connection through WebDriver to the Selenium Grid
    var driver = new webDriver.Builder()
        .withCapabilities(desiredCaps)
        .usingServer(seleniumGridUrl)
        .build();

    driver.manage().window().maximize();
    return driver;
}

exports.createDriver = createDriver;
