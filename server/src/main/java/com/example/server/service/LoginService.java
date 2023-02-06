package com.example.server.service;

import com.example.server.model.Login;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface LoginService {
    public List<Login> findAll();
}
