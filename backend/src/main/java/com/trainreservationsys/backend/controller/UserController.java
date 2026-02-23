package com.trainreservationsys.backend.controller;

import com.trainreservationsys.backend.model.User;
import com.trainreservationsys.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Allows your Next.js frontend to send data here
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Endpoint for Sign Up: http://127.0.0.1:8080/api/users/register
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User newUser) {
        
        // 1. Check if the email already exists in the database
        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already registered!");
        }
        
        // 2. Save the new user to MySQL
        User savedUser = userRepository.save(newUser);
        
        // 3. Send a success message back to Next.js
        return ResponseEntity.ok(savedUser);
    }


@PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody User loginDetails) {
    // 1. Find user by email
    return userRepository.findByEmail(loginDetails.getEmail())
        .map(user -> {
            // 2. Check password (In production, use BCrypt.check())
            if (user.getPassword().equals(loginDetails.getPassword())) {
                return ResponseEntity.ok(user); // Send user data back on success
            } else {
                return ResponseEntity.status(401).body("Error: Invalid Password");
            }
        })
        .orElse(ResponseEntity.status(404).body("Error: User not found"));
}}