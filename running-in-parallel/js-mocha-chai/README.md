## WebDriver examples in JavaScript with Mocha and Chai running in parallel

These examples are running a few simple tests written in JavaScript using the [Mocha](https://mochajs.org/) test
framework. The tests are executed in parallel with [Mocha-Parallel-Tests](https://www.npmjs.com/package/mocha-parallel-tests).

### Environment Setup

1. Check your [JavaScript](https://github.com/diemol/frontend_testing#javascript) setup.

2. Sauce Credentials
    * In the terminal export your Sauce Labs Credentials as environmental variables:
    ```sh
    export SAUCE_USERNAME=<your Sauce Labs username>
    export SAUCE_ACCESS_KEY=<your Sauce Labs access key>
    ```

### Steps to run it:

1. Clone the repo:

    ```sh
    git clone https://github.com/diemol/frontend_testing
    cd frontend_testing
    ```
1. Change directory to:

    ```sh
    cd running-in-parallel/js-mocha-chai/<initial/complete>
    ```
1. Install Node dependencies (Selenium WebDriver, Mocha, Chai, and Mocha-Parallel-Tests):

    ```sh
    npm install
    ```
1. Execute the code:

	```sh
	npm test
	```

Afterwards you can check the executed test in the [Sauce Labs Dashboard](https://saucelabs.com/beta/dashboard/)

### How is parallelism working in these examples?

_For the initial status of the example_

The tests are executed in several threads using the mocha-parallel-tests. This `npm` package grabs every JS file in
the `test` folder and runs it in its own thread. In addition, you can change the `--max-parallel` value in the
[package.json](https://github.com/diemol/frontend_testing/blob/master/running-in-parallel/js-mocha-chai/initial/package.json#L7) file to increase the number of threads if needed.

_For the complete status of the example_

When multiple browsers are used, the project is wrapped in several Grunt tasks and then executed in parallel.


