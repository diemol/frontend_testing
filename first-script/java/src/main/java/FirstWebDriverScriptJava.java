import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class FirstWebDriverScriptJava {
    public static void main(String[] args) throws InterruptedException {

        // Create a new instance of the Firefox driver, this makes that the code is able to Firefox
        WebDriver driver = new FirefoxDriver();

        // Use WebDriver to visit a search engine
        driver.get("http://www.duckduckgo.com");

        // Get the field to input the search text
        WebElement webElement = driver.findElement(By.name("q"));

        // Enter the search text
        webElement.sendKeys("Berlin");

        /*
            Small pause to see the code running, this is actually a bad practice in testing, but here is used only
            for demonstration purposes
         */
        Thread.sleep(1000 * 5);

        // Submit the form, perform the search
        webElement.submit();

        /*
            Small pause to see the code running, this is actually a bad practice in testing, but here is used only
            for demonstration purposes
         */
        Thread.sleep(1000 * 5);

        // Print out the title of the page
        System.out.println("The page title is: " + driver.getTitle());


        // Close the browser
        driver.quit();
    }
}
