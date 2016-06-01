// Selenium Grid url
var dockerMachineHost = process.env.DOCKER_MACHINE_HOST;
var seleniumGridUrl = 'http://' + dockerMachineHost + ':4444/wd/hub';
var driver;

// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');
var By = webDriver.By;
var until = webDriver.until;

// Getting the Chai expect library for assertions
var expect = require('chai').expect;

const mochaTimeOut = 30000; //ms


describe('User Registration Test', function() {
    this.timeout(mochaTimeOut);

    beforeEach(function() {
        var capabilities = new webDriver.Capabilities().
        set(webDriver.Capability.BROWSER_NAME, webDriver.Browser.CHROME).
        set(webDriver.Capability.PLATFORM, 'LINUX');

        driver = new webDriver.Builder()
            .withCapabilities(capabilities)
            .usingServer(seleniumGridUrl)
            .build();

        driver.manage().window().maximize();
    });

    it('Register user should leave new user logged in', function(done) {

        // Go to the register page
        driver.get("http://phptravels.net/register");

        // Filling up the form to Sign Up
        driver.findElement(By.name("firstname")).sendKeys("John");
        driver.findElement(By.name("lastname")).sendKeys("Doe");
        driver.findElement(By.name("phone")).sendKeys("+1223456789");
        var randomEmail = Math.random().toString(36).substring(7) + "@example.com";
        driver.findElement(By.name("email")).sendKeys(randomEmail);
        var randomPassword = Math.random().toString(36).substring(10);
        driver.findElement(By.name("password")).sendKeys(randomPassword);
        driver.findElement(By.name("confirmpassword")).sendKeys(randomPassword);

        //Click on "Sign Up"
        var signUpButton = driver.findElement(By.css("button.signupbtn.btn_full.btn.btn-action.btn-block.btn-lg"));
        signUpButton.click();

        // After Signing Up, we assert that we are logged in by checking the name displayed on the user page
        var welcomeMessage = driver.wait(until.elementLocated(By.css("h3.RTL"), 10000));
        var expectedWelcomeMessage = "Hi, John Doe";
        welcomeMessage.getText().then(function(welcomeText) {
            expect(welcomeText).to.equal(expectedWelcomeMessage);
            done();
        });
    });

    afterEach(function(done) {
        // Quitting the browser
        driver.quit().then(done);
    });
});

