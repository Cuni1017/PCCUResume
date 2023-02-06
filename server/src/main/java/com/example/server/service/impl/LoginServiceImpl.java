package com.example.server.service.impl;

import com.example.server.dao.LoginRepository;
import com.example.server.model.Login;
import com.example.server.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@Component
public class LoginServiceImpl implements LoginService {
    @Autowired
    private LoginRepository loginRepository;
    @Override
    public List<Login> findAll() {
        if(loginRepository.findAll() == null){
            System.out.println("dao有錯");
            return null;
        }else{
            return loginRepository.findAll();
        }

    }
}
