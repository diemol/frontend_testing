import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.BrowserType;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.DataProvider;

import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.net.URL;

public class BaseTest {

    // SauceLabs setup variables
    public static final String userName = System.getenv("SAUCE_USERNAME");
    public static final String accessKey = System.getenv("SAUCE_ACCESS_KEY");
    public static final String SAUCE_LABS_URL = String.format("http://%s:%s@ondemand.saucelabs.com:80/wd/hub",
            userName, accessKey);

    // We need a thread safe environment to handle the webDriver variable in each thread separately
    private ThreadLocal<WebDriver> webDriver = new ThreadLocal<>();

    // Data provider which returns the browsers that will be used to run the tests
    @DataProvider(name = "browsersAndPlatforms", parallel = true)
    public static Object[][] browsersAndPlatformsProvider() {
        return new Object[][] {
                new Object[]{BrowserType.CHROME, Platform.LINUX},
                new Object[]{BrowserType.FIREFOX, Platform.LINUX},
                new Object[]{BrowserType.CHROME, Platform.WIN8},
                new Object[]{BrowserType.FIREFOX, Platform.WIN8},
                new Object[]{BrowserType.SAFARI, Platform.EL_CAPITAN}
        };
    }

    @BeforeMethod
    public void startWebDriverAndGetBaseUrl(Method method, Object[] testArgs) throws MalformedURLException {
        String browserType = testArgs[0].toString();
        Platform platform = (Platform) testArgs[1];
        DesiredCapabilities desiredCapabilities = new DesiredCapabilities();
        desiredCapabilities.setCapability(CapabilityType.BROWSER_NAME, browserType);
        desiredCapabilities.setCapability(CapabilityType.PLATFORM, platform);
        desiredCapabilities.setCapability("name", method.getName());

        webDriver.set(new RemoteWebDriver(new URL(SAUCE_LABS_URL), desiredCapabilities));

        webDriver.get().manage().window().maximize();
    }

    @AfterMethod
    public void quitBrowser() {
        webDriver.get().quit();
    }

    // Returns the webDriver for the current thread
    public WebDriver getWebDriver() {
        return webDriver.get();
    }

}
