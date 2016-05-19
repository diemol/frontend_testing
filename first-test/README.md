### WebDriver test example in Java and JavaScript

This is a simple test where a page is open, and then the title of the page is asserted vs. a expected value.

Implemented in [Java with JUnit](https://github.com/diemol/frontend_testing/tree/master/first-test/java-junit), [Java with TestNG](https://github.com/diemol/frontend_testing/tree/master/first-test/java-testng) and [JavaScript with Mocha and Chai](https://github.com/diemol/frontend_testing/tree/master/first-test/js-mocha-chai).

##### [docker-selenium](https://github.com/elgalu/docker-selenium) is used to run the tests
This means:
* You need to have [docker](https://www.docker.com/) installed. Here are the instructions for [Mac](https://docs.docker.com/mac/), [Linux](https://docs.docker.com/linux/) and [Windows](https://docs.docker.com/windows/).
* After installing docker, and before running the tests, just run this command to start the docker-selenium container:

  ```
  $ docker run --rm -ti --name=grid -p 4444:24444 -p 5920:25900 -v /dev/shm:/dev/shm -p 6080:26080 -e NOVNC=true -e VNC_PASSWORD=hola elgalu/selenium:2.53.0g
  ```
* When the container starts, you can see the Selenium Grid running at [http://localhost:4444/grid/console](http://localhost:4444/grid/console). **Attention**: If you are running Mac, `localhost` may not work, use `docker-machine ip default` to find out the correct IP for you.

* If you want to see the browsers while the test is running, you can access the container with VNC through [http://localhost:6080/vnc.html](http://localhost:6080/vnc.html). The password is `hola`, it was set in the docker command. As in the previous point, check your docker IP.
