package com.sumadugai.authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class SecurityController {

    @Autowired
    private UserService userService;

    @GetMapping("/home")
    public String home() {
        return "Welcome to the Home page!";
    }

    @GetMapping("/user")
    public String userPage() {
        return "Welcome User!";
    }

    @GetMapping("/admin")
    public String adminPage() {
        return "Welcome Admin!";
    }

    @PostMapping("/create")
    public String createUser(@RequestParam("username") String username, @RequestParam("password") String password) {
        return userService.create(username, password);
    }
}