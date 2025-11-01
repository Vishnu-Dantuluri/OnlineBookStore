package com.example.bookstore.controller;
import com.example.bookstore.model.User;
import com.example.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin // allow frontend
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        if (userRepo.findByUsername(user.getUsername()) != null) {
            return "Username already exists!";
        }
        userRepo.save(user);
        return "Signup successful!";
    }

    @PostMapping("/signin")
    public String signin(@RequestBody User user) {
        User existing = userRepo.findByUsername(user.getUsername());
        if (existing != null && existing.getPassword().equals(user.getPassword())) {
            return "Signin successful!";
        }
        return "Invalid credentials!";
    }
}
