package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class BookingDetailsPage {

    private WebDriver webDriver;

    @FindBy(name = "firstname")
    private WebElement firstName;

    @FindBy(name = "lastname")
    private WebElement lastName;

    @FindBy(name = "phone")
    private WebElement phone;

    @FindBy(name = "email")
    private WebElement email;

    @FindBy(name = "confirmemail")
    private WebElement confirmEmail;

    @FindBy(name = "address")
    private WebElement address;

    @FindBy(name = "additionalnotes")
    private WebElement additionalNotes;

    @FindBy(name = "guest")
    private WebElement confirmBooking;

    public BookingDetailsPage(WebDriver webDriver) {
        this.webDriver = webDriver;
        PageFactory.initElements(this.webDriver, this);
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

    public void setConfirmEmail(String email) {
        this.confirmEmail.sendKeys(email);
    }

    public void setAddress(String address) {
        this.address.sendKeys(address);
    }

    public void setAdditionalNotes(String notes) {
        this.additionalNotes.sendKeys(notes);
    }

    public BookingConfirmationPage clickConfirmBooking() {
        if (!confirmBooking.isDisplayed()) {
            Actions actions = new Actions(webDriver);
            actions.moveToElement(confirmBooking);
            actions.perform();
        }
        confirmBooking.click();
        return new BookingConfirmationPage(this.webDriver);
    }




}
