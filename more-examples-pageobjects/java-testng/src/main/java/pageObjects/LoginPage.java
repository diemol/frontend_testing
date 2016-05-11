package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage {

    private WebDriver webDriver;

    @FindBy(name = "firstname")
    private WebElement firstName;

    @FindBy(name = "lastname")
    private WebElement lastName;

    @FindBy(name = "phone")
    private WebElement phone;

    @FindBy(name = "email")
    private WebElement email;

    @FindBy(name = "password")
    private WebElement password;

    @FindBy(name = "confirmpassword")
    private WebElement confirmPassword;

    @FindBy(css = "button.signupbtn.btn_full.btn.btn-primary.btn-block.btn-lg")
    private WebElement signUp;

    public LoginPage(WebDriver webDriver) {
        this.webDriver = webDriver;
        PageFactory.initElements(this.webDriver, this);
    }

    public void visit() {
        this.webDriver.get("http://phptravels.net/register");
    }

    public void setFirstName(String firstName) {
        this.firstName.sendKeys(firstName);
    }

    public void setLastName(String lastName) {
        this.lastName.sendKeys(lastName);
    }

    public void setPhone(String phone) {
        this.phone.sendKeys(phone);
    }

    public void setEmail(String email) {
        this.email.sendKeys(email);
    }

    public void setPassword(String password) {
        this.password.sendKeys(password);
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword.sendKeys(confirmPassword);
    }

    public UserAccountPage clickSignUp() {
        this.signUp.click();
        return new UserAccountPage(this.webDriver);
    }

}
