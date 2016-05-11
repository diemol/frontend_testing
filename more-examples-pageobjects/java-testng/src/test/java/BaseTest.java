import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.BrowserType;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

public class BaseTest {

    // SauceLabs setup variables
    public static final String userName = System.getenv("SAUCE_USERNAME");
    public static final String accessKey = System.getenv("SAUCE_ACCESS_KEY");
    public static final String SAUCE_LABS_URL = String.format("http://%s:%s@ondemand.saucelabs.com:80/wd/hub",
            userName, accessKey);

    // We need a thread safe environment to handle the webDriver variable in each thread separately
    private ThreadLocal<WebDriver> webDriver = new ThreadLocal<WebDriver>();


    @BeforeMethod
    public void startWebDriverAndGetBaseUrl(Method method) throws MalformedURLException {
        DesiredCapabilities desiredCapabilities = new DesiredCapabilities();
        desiredCapabilities.setCapability(CapabilityType.BROWSER_NAME, BrowserType.CHROME);
        desiredCapabilities.setCapability(CapabilityType.PLATFORM, Platform.LINUX);
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

    // Method to get a future date
    public Date getFutureDate(Date baseDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(baseDate);
        calendar.add(Calendar.DATE, 5);
        return calendar.getTime();
    }

}
