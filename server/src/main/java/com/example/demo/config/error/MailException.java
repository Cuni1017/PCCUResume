package com.example.demo.config.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class MailException  extends RuntimeException{
    public MailException(String msg){
        super(msg);
    }
}
