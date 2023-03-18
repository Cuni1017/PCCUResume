package com.example.demo.category;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class SendEmailCategory {

    @NotBlank(message = "驗證碼沒填")
    private String studentValidMsg;
    @NotBlank(message = "email沒填")
    @Email(message = "不是email")
    private String studentEmail;
}
