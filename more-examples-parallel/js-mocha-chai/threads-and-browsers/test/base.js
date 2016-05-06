// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');

// SauceLabs environment variables
var userName,
    accessKey;

function createDriver(testTitle, browser, platform) {
    // Retrieve the userName and accessKey from the environment
    userName = process.env.SAUCE_USERNAME;
    accessKey = process.env.SAUCE_ACCESS_KEY;
    var sauceLabsUrl = "http://" + userName + ":" + accessKey + "@ondemand.saucelabs.com:80/wd/hub";

    // We declare that we want to run the test on Chrome + Linux
    var desiredCaps = {
        'browserName': browser,
        'platform': platform,
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

function testBrowsers() {
    return [
        {browser: webDriver.Browser.CHROME, platform: 'LINUX'},
        {browser: webDriver.Browser.FIREFOX, platform: 'LINUX'},
        {browser: webDriver.Browser.CHROME, platform: 'Windows 7'},
        {browser: webDriver.Browser.FIREFOX, platform: 'Windows 7'},
        {browser: webDriver.Browser.SAFARI, platform: 'OS X 10.10'}
    ];
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}


exports.createDriver = createDriver;
exports.testBrowsers = testBrowsers;
exports.formatDate = formatDate;