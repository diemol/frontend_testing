## WebDriver example in JavaScript with Mocha and Chai

These examples are running two tests written in JavaScript using the [Mocha](https://mochajs.org/) test framework. The
tests are executed in parallel with [Mocha-Parallel-Tests](https://www.npmjs.com/package/mocha-parallel-tests).

### Environment Setup

1. Project Dependencies
    * Install [Node.js](https://nodejs.org/en/)
    * Or Install Node.js with [Homebrew](http://brew.sh/)
    ```
    $ brew install node
    ```
    * Install Selenium WebDriver
    ```
    $ npm install selenium-webdriver
    ```
    * Install Mocha
    ```
    $ npm install -g mocha
    ```
    * Install Chai
    ```
    $ npm install chai
    ```
    * Install the Mocha-Parallel-Tests package
    ```
    $ npm install mocha-parallel-tests
    ```
2. Sauce Credentials
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
    $ cd more-examples-parallel/js-mocha-chai
    ```
1. Execute the code

  [Threads](https://github.com/diemol/frontend_testing/tree/master/more-examples-parallel/js-mocha-chai/threads) example:
	```
	$ ./node_modules/.bin/mocha-parallel-tests --max-parallel 2 ./threads/test/
	```
  [Threads and Browsers](https://github.com/diemol/frontend_testing/tree/master/more-examples-parallel/js-mocha-chai/threads-and-browsers) example:
	```
	$ ./node_modules/.bin/mocha-parallel-tests --max-parallel 2 ./threads-and-browsers/test/
	```

Afterwards you can check the executed test in the [Sauce Labs Dashboard](https://saucelabs.com/beta/dashboard/)

### How is parallelism working in these examples?

_[Threads](https://github.com/diemol/frontend_testing/tree/master/more-examples-parallel/js-mocha-chai/threads) example:_

The two tests are executed in two threads using the mocha-parallel-tests, this means that each test will run in its own thread. Of course, this example can be extended in tests and threads number. This is the situation where you have a large number of tests, and you want to run them in different threads to reduce the execution time, but in a single browser/platform combination.

_[Threads and Browsers](https://github.com/diemol/frontend_testing/tree/master/more-examples-parallel/js-mocha-chai/threads-and-browsers) example:_
A simple bi-dimensional array is used to configure five different browser/platform combinations where the tests will be executed, and the tests are executed inside a `forEach` that loops over the bi-dimensional array. This example will run 10 tests (the original two ones, in five different combinations each one), and the 10 tests will split in two threads (but it can be more). This is the situation where you want to check your most important tests (e.g. e2e) in different browsers and platforms.
	
