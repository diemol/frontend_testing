# Frontend Testing Workshop - Code Examples
This repository contains different examples that are used during a basic Frontend Testing workshop.

The code was written in general in a simple way, without any frameworks or external tools that could hide the basic
steps to develop tests with Selenium WebDriver.

The main idea of the code is to show how tests can be written from scratch, but it is clear that different frameworks
could be used to simplify the code and provide helper functions. Nevertheless, the intention is to keep it basic and
simple.

The examples are provided in Java with JUnit/TestNG and JavaScript with Mocha + Chai.

### The code is structured as follows:
* [first-script](https://github.com/diemol/frontend_testing/tree/master/first-script)

    Simple code showing how to use WebDriver to open a page and interact with it.
* [first-test](https://github.com/diemol/frontend_testing/tree/master/first-test)

    A slight extension of the previous example, where a page is open and interacted with it, and finally an assertion of a expected value is done.
* [more-examples](https://github.com/diemol/frontend_testing/tree/master/more-examples)

    A couple of more complex examples showing tests for two typical scenarios (user registration and booking a hotel room).
* [more-examples-parallel](https://github.com/diemol/frontend_testing/tree/master/more-examples-parallel)

    After having tests working, a natural step is to try to execute all of them in less time. The examples shown in the previous step, are executed in parallel with slight changes in the code.
* [more-examples-pageobjects](https://github.com/diemol/frontend_testing/tree/master/more-examples-pageobjects)

    A final round up of the previous examples but now using the Page Object model/pattern, which is know as one of the best practices when doing Frontend Testing.

