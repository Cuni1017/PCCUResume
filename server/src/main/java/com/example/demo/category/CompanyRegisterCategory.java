package com.example.demo.category;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
<<<<<<< HEAD:server/src/main/java/com/example/demo/category/CompanyRegisterCategory.java
public class CompanyRegisterCategory {
=======
public class CompanyRegisterDto {
    @NotBlank(message = "公司名稱沒填")
>>>>>>> 9aab6050f903c28d5cf29ef83443932a8ed14b00:server/src/main/java/com/example/demo/dto/CompanyRegisterDto.java
    private String companyName;
    @NotBlank(message = "公司型態沒填")
    private String companyTitle;
    @NotBlank(message = "公司帳號沒填")
    private String companyUsername;
    @NotBlank(message = "公司密碼沒填")
    private String companyPassword;
    @NotBlank(message = "公司號碼沒填")
    private int companyNumber;
    @NotBlank(message = "公司縣市沒填")
    private String companyCounty;
    @NotBlank(message = "公司地區沒填")
    private String companyDistrict;
    @NotBlank(message = "公司地址沒填")
    private String companyAddress;
    @NotBlank(message = "公司email沒填")
    @Email(message = "不是email")
    private String companyEmail;
}

   
