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

    private static final String SELENIUM_GRID_URL = "http://localhost:4444/wd/hub";

    // We need a thread safe environment to handle the webDriver variable in each thread separately
    private ThreadLocal<WebDriver> webDriver = new ThreadLocal<>();

    // Data provider which returns the browsers that will be used to run the tests
    @DataProvider(name = "browsersAndPlatforms", parallel = true)
    public static Object[][] browsersAndPlatformsProvider() {
        return new Object[][] {
                new Object[]{BrowserType.CHROME, Platform.LINUX},
                new Object[]{BrowserType.FIREFOX, Platform.LINUX},
                new Object[]{BrowserType.SAFARI, Platform.EL_CAPITAN},
                new Object[]{BrowserType.IE, Platform.WIN10},
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

        webDriver.set(new RemoteWebDriver(new URL(SELENIUM_GRID_URL), desiredCapabilities));

        webDriver.get().manage().window().maximize();
    }

    @AfterMethod
    public void quitBrowser() {
        webDriver.get().quit();
    }

    // Returns the webDriver for the current thread
    @SuppressWarnings("WeakerAccess")
    public WebDriver getWebDriver() {
        return webDriver.get();
    }

}
