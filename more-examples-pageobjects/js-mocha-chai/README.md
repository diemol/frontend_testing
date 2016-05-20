## WebDriver example using Page Objects in JavaScript with Mocha and Chai

These examples are running two tests written in JavaScript using the [Mocha](https://mochajs.org/) test framework. The
tests are executed in parallel with [Mocha-Parallel-Tests](https://www.npmjs.com/package/mocha-parallel-tests).

### Environment Setup

1. Project Dependencies
    * Install [Node.js](https://nodejs.org/en/)
    * Or Install Node.js with [Homebrew](http://brew.sh/)
    ```
    $ brew install node
    ```

1. Sauce Credentials
    * In the terminal export your Sauce Labs Credentials as environmental variables:
    ```
    $ export SAUCE_USERNAME=<your Sauce Labs username>
    $ export SAUCE_ACCESS_KEY=<your Sauce Labs access key>
    ```

### Steps to run it:

1. Clone the repo:

    ```
    $ git clone https://github.com/diemol/frontend_testing
    ```
1. Change directory to:

    ```
    $ cd more-examples-pageobjects/js-mocha-chai
    ```
1. Install Node dependencies (Selenium WebDriver, Mocha, Chai, and Mocha-Parallel-Tests):

    ```
    $ npm install
    ```
1. Execute the code

	```
	$ npm test ./test/
	```

Afterwards you can check the executed test in the [Sauce Labs Dashboard](https://saucelabs.com/beta/dashboard/)

### More information

[WebDriver and PageObjects](https://watirmelon.com/2015/10/30/webdriverjs-mocha-part-3-page-objects/)
	
