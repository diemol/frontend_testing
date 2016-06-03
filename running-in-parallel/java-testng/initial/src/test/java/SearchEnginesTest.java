import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.BrowserType;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.net.URL;

public class SearchEnginesTest {

    public static final String userName = System.getenv("SAUCE_USERNAME");
    public static final String accessKey = System.getenv("SAUCE_ACCESS_KEY");
    public static final String SAUCE_LABS_URL = String.format("http://%s:%s@ondemand.saucelabs.com:80/wd/hub",
            userName, accessKey);

    public WebDriver webDriver;

    @BeforeMethod
    public void startWebDriver(Method method) throws MalformedURLException {
        DesiredCapabilities desiredCapabilities = new DesiredCapabilities();
        desiredCapabilities.setCapability(CapabilityType.BROWSER_NAME, BrowserType.CHROME);
        desiredCapabilities.setCapability(CapabilityType.PLATFORM, Platform.LINUX);
        desiredCapabilities.setCapability("name", method.getName());

        webDriver = new RemoteWebDriver(new URL(SAUCE_LABS_URL), desiredCapabilities);

        webDriver.manage().window().maximize();
    }

    @AfterMethod
    public void quitBrowser() {
        webDriver.quit();
    }

    @Test
    public void loadGooglePageAndCheckTitle() {

        // Go to the homepage
        webDriver.get("http://www.google.com");

        // Assert that the title is the expected one
        Assert.assertEquals(webDriver.getTitle(), "Google", "Page title is not the expected one");
    }

    @Test
    public void loadBingPageAndCheckTitle() {

        // Go to the homepage
        webDriver.get("http://www.bing.com");

        // Assert that the title is the expected one
        Assert.assertEquals(webDriver.getTitle(), "Bing", "Page title is not the expected one");
    }

    @Test
    public void loadDuckDuckGoPageAndCheckTitle() {

        // Go to the homepage
        webDriver.get("http://www.duckduckgo.com");

        // Assert that the title is the expected one
        Assert.assertEquals(webDriver.getTitle(), "DuckDuckGo", "Page title is not the expected one");
    }

}
