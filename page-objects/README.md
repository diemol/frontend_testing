## WebDriver examples using the Page Object Model/Pattern

You can find here examples written in Java and JavaScript that shows how 
[Page Objects](http://martinfowler.com/bliki/PageObject.html) can be used to write more readable tests. The folder 
structure is as follows:
* [Java-Fluentlenium](https://github.com/diemol/frontend_testing/tree/master/page-objects/java-fluentlenium): Tests 
written in Java with [Fluentlenium](http://fluentlenium.org) as framework. The page object classes are located in a 
different location from the tests in a single package, nevertheless it could be more strict by separating the related 
objects in different packages.
* [JS-Protractor](https://github.com/diemol/frontend_testing/tree/master/page-objects/js-protractor): Tests written 
in JavaScript, using [Protractor](http://www.protractortest.org/). Whereas classes don't come naturally in JavaScript, 
the page object functionality can be simulated using functions and prototypes.
