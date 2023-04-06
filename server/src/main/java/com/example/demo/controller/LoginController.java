package com.example.demo.controller;

import com.example.demo.dto.AuthenticationDto;
import com.example.demo.category.AuthenticationCategory;
import com.example.demo.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController

@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;
    @PostMapping("/login")
    public ResponseEntity<Object> login(
            @RequestBody AuthenticationCategory request
    ) {
        return ResponseEntity.ok(loginService.login(request));
    }
}
