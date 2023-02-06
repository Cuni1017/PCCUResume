package com.example.server.controller;

import com.example.server.model.Login;
import com.example.server.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LoginController {
    @Autowired
    private LoginService loginService;
    @GetMapping("/login")
    public ResponseEntity<List<Login>> login(){
        List<Login> loginList =  loginService.findAll();
        if(loginList == null){
            System.out.println("空直");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }else{
            return ResponseEntity.status(HttpStatus.OK).body(loginList);
        }

    }
}
