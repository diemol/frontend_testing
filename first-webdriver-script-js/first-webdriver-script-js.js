// Create a new instance of WebDriver
var webdriver = require('selenium-webdriver');

// Use WebDriver to visit a search engine with Firefox
var driver = new webdriver.Builder()
    .forBrowser("firefox")
    .build();
driver.get("http://www.duckduckgo.com");

// Get the field to input the search text
var webElement = driver.findElement(webdriver.By.name("q"));

// Enter the search text
webElement.sendKeys("Berlin");

/*
 Small pause to see the code running, this is actually a bad practice in testing, but here is used only
 for demonstration purposes
 */
driver.sleep(1000 * 5);

// Submit the form, perform the search
webElement.submit();

/*
 Small pause to see the code running, this is actually a bad practice in testing, but here is used only
 for demonstration purposes
 */
driver.sleep(1000 * 5);

// Print out the title of the page
driver.getTitle().then(function(title) {
    console.log('Page title is: ' + title);
});

// Close the browser
driver.quit();
