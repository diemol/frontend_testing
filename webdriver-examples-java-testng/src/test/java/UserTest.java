import org.apache.commons.lang3.RandomStringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

public class UserTest extends BaseTest {

    @Test
    public void registerUserShouldLeaveNewUserLoggedIn() {
        // Click on the "Sign Up" link
        WebElement myAccount = webDriver.findElement(By.cssSelector("a.show-submenu"));
        myAccount.click();
        WebDriverWait wait = new WebDriverWait(webDriver, 10);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("a[href='http://phptravels.net/register']")));
        WebElement signUp = webDriver.findElement(By.cssSelector("a[href='http://phptravels.net/register']"));
        signUp.click();
        // Filling up the form to Sign Up
        webDriver.findElement(By.name("firstname")).sendKeys("John");
        webDriver.findElement(By.name("lastname")).sendKeys("Doe");
        webDriver.findElement(By.name("phone")).sendKeys("+1223456789");
        String randomEmail = String.format("%s@example.com", RandomStringUtils.randomAlphabetic(5).toLowerCase());
        webDriver.findElement(By.name("email")).sendKeys(randomEmail);
        String randomPassword = RandomStringUtils.randomAlphanumeric(10);
        webDriver.findElement(By.name("password")).sendKeys(randomPassword);
        webDriver.findElement(By.name("confirmpassword")).sendKeys(randomPassword);
        //Click on "Sign Up"
        WebElement signUpButton = webDriver.findElement(By.cssSelector("button.signupbtn.btn_full.btn.btn-primary.btn-block.btn-lg"));
        signUpButton.click();
        // After Signing Up, we assert that we are logged in by checking the name displayed on the user page
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("h3.RTL")));
        WebElement welcomeMessage = webDriver.findElement(By.cssSelector("h3.RTL"));
        String expectedWelcomeMessage = "Hi, John Doe";
        Assert.assertEquals(welcomeMessage.getText(), expectedWelcomeMessage, "Welcome message was not the expected one");
    }
}
