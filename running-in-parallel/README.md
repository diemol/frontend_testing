## WebDriver examples running in parallel

You can find here examples written in Java and JavaScript that show how tests can be executed in parallel, the folder structure is as follows:
* [Java-TestNG](https://github.com/diemol/frontend_testing/tree/master/running-in-parallel/java-testng): Tests written in Java with [TestNG](http://testng.org/doc/index.html) as framework, and using the [Surefire plugin](https://maven.apache.org/surefire/maven-surefire-plugin/) to configure the parallelism values and to pass them to TestNG.
* [JS-Mocha-Chai](https://github.com/diemol/frontend_testing/tree/master/running-in-parallel/js-mocha-chai): Tests written in JavaScript, using [Mocha](http://mochajs.org/) to execute them and [Chai](http://chaijs.com/) to perform assertions. [Mocha-Parallel-Tests](https://www.npmjs.com/package/mocha-parallel-tests) is used to split the tests in different threads.

All the examples are using [SauceLabs](https://saucelabs.com/).
