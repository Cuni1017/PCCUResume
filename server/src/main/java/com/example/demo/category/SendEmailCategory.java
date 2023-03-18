package com.example.demo.category;

<<<<<<< HEAD:server/src/main/java/com/example/demo/category/SendEmailCategory.java
public class SendEmailCategory {
=======
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class SendEmailDto {
    @NotBlank(message = "驗證碼沒填")
>>>>>>> 9aab6050f903c28d5cf29ef83443932a8ed14b00:server/src/main/java/com/example/demo/dto/SendEmailDto.java
    private String studentValidMsg;
    @NotBlank(message = "email沒填")
    @Email(message = "不是email")
    private String studentEmail;
}
