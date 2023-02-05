package com.example.capstoneproject.controller;

import com.example.capstoneproject.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    public ResponseEntity<User> getUserById(@PathVariable Integer userId){


    }
}
