## WebDriver examples in JavaScript with Mocha and Chai running in parallel

These examples are running a few simple tests written in JavaScript using the [Mocha](https://mochajs.org/) test
framework. The tests are executed in parallel with [Mocha-Parallel-Tests](https://www.npmjs.com/package/mocha-parallel-tests).

### Environment Setup

1. Project Dependencies
    * Install [Node.js](https://nodejs.org/en/)
    * Or Install Node.js with [Homebrew](http://brew.sh/)
    ```
    $ brew install node
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
    $ cd running-in-parallel/js-mocha-chai/<initial/complete>
    ```
1. Install Node dependencies (Selenium WebDriver, Mocha, Chai, and Mocha-Parallel-Tests):

    ```
    $ npm install
    ```
1. Execute the code:

	```
	$ npm test ./test/
	```

Afterwards you can check the executed test in the [Sauce Labs Dashboard](https://saucelabs.com/beta/dashboard/)

### How is parallelism working in these examples?


The tests are executed in several threads using the mocha-parallel-tests. This `npm` package grabs every JS file in
the `test` folder and runs it in its own thread. In addition, you can change the `--max-parallel` value in the
package.json file to increase the number of threads if needed.


