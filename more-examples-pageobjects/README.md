## WebDriver examples using the Page Object Model/Pattern

You can find here examples written in Java and JavaScript that shows how [Page Objects](http://martinfowler.com/bliki/PageObject.html) can be used to write more readable tests. The folder structure is as follows:
* [Java-TestNG](https://github.com/diemol/frontend_testing/tree/master/more-examples-pageobjects/java-testng): Tests written in Java with [TestNG](http://testng.org/doc/index.html) as framework. The page object classes are located in a different location from the tests in a single package, nevertheless it could be more strict by separating the related objects in different packages.
* [JS-Mocha-Chai](https://github.com/diemol/frontend_testing/tree/master/more-examples-pageobjects/js-mocha-chai): Tests written in JavaScript, using [Mocha](http://mochajs.org/) to execute them and [Chai](http://chaijs.com/) to perform assertions. Whereas classes don't come naturally in JavaScript, the page object functionality can be simulated using functions and prototypes. 

All the examples are using [SauceLabs](https://saucelabs.com/).
