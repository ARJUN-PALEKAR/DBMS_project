package com.trainreservationsys.backend;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    // This creates an endpoint at http://localhost:8080/hello
    @GetMapping("/hello")
    public String sayHello() {
        return "Spring Boot is successfully running! Ready to connect to MySQL.";
    }
}