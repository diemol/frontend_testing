## WebDriver examples using the Page Object Model/Pattern

You can find here examples written in Java and JavaScript that shows how [Page Objects](http://martinfowler.com/bliki/PageObject.html) can be used to write more readable tests. The folder structure is as follows:
* [Java-TestNG](https://github.com/diemol/frontend_testing/tree/master/page-objects/java-testng): Tests written in Java with [TestNG](http://testng.org/doc/index.html) as framework. The page object classes are located in a different location from the tests in a single package, nevertheless it could be more strict by separating the related objects in different packages.
* [JS-Mocha-Chai](https://github.com/diemol/frontend_testing/tree/master/page-objects/js-mocha-chai): Tests written in JavaScript, using [Mocha](http://mochajs.org/) to execute them and [Chai](http://chaijs.com/) to perform assertions. Whereas classes don't come naturally in JavaScript, the page object functionality can be simulated using functions and prototypes.

##### [docker-selenium](https://github.com/elgalu/docker-selenium) is used to run the tests
This means:
* You need to have [docker](https://www.docker.com/) installed. Here are the instructions for [Mac](https://docs.docker.com/mac/), [Linux](https://docs.docker.com/linux/) and [Windows](https://docs.docker.com/windows/).
* After installing docker, and before running the tests, just run this command to start the docker-selenium container:

  ```sh
  docker run --rm -ti --name=grid -p 4444:24444 -p 5920:25900 -v /dev/shm:/dev/shm -p 6080:26080 -e NOVNC=true -e VNC_PASSWORD=hola elgalu/selenium:2.53.0r
  ```
* When the container starts, you can see the Selenium Grid running at [http://localhost:4444/grid/console](http://localhost:4444/grid/console). **Attention**: If you are running Mac, `localhost` may not work, use `docker-machine ip default` to find out the correct IP for you.

* If you want to see the browsers while the test is running, you can access the container with VNC through [http://localhost:6080/vnc.html](http://localhost:6080/vnc.html). The password is `hola`, it was set in the docker command. As in the previous point, check your docker IP.

