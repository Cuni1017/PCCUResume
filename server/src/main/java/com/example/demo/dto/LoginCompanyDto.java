package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class LoginCompanyDto {
    private String companyId;
    private String companyName;
    private String companyUsername;
    private String companyImageUrl;
    private String companyValidType;
    private String role;

}
