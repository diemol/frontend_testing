# Frontend Testing Workshop - Code Examples
This repository contains different examples that are used during a basic Frontend Testing workshop.

The code was written in general in a simple way, without any frameworks or external tools that could hide the basic
steps to develop tests with Selenium WebDriver.

The main idea of the code is to show how tests can be written from scratch, but it is clear that different frameworks
could be used to simplify the code and provide helper functions. Nevertheless, the intention is to keep it basic and
simple.

The examples are provided in Java with TestNG and JavaScript with Mocha + Chai.

### The code is structured as follows:
* [first-test](https://github.com/diemol/frontend_testing/tree/master/first-test)

    A page is opened, the page title is retrieved, and finally an assertion of a expected value is done.
* [user-registration](https://github.com/diemol/frontend_testing/tree/master/user-registration)

    This is a simple example where a user gets registered on a website.
* [hotel-booking](https://github.com/diemol/frontend_testing/tree/master/hotel-booking)

    This is an example where a guest user books a hotel on a website.
* [more-examples-parallel](https://github.com/diemol/frontend_testing/tree/master/more-examples-parallel)

    After having tests working, a natural step is to try to execute all of them in less time. The examples shown in the previous step, are executed in parallel with slight changes in the code.
* [more-examples-pageobjects](https://github.com/diemol/frontend_testing/tree/master/more-examples-pageobjects)

    A final round up of the previous examples but now using the Page Object model/pattern, which is know as one of the best practices when doing Frontend Testing.

