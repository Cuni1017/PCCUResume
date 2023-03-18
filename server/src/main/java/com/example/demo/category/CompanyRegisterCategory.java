package com.example.demo.category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyRegisterCategory {
    private String companyName;
    private String companyTitle;
    private String companyUsername;
    private String companyPassword;
    private int companyNumber;
    private String companyCounty;
    private String companyDistrict;
    private String companyAddress;
    private String companyEmail;
}

   
