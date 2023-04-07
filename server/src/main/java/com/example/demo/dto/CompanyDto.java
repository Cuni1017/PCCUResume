package com.example.demo.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompanyDto {

    private String companyId;

    private String companyName;

    private String companyImageUrl;

    private String companyTitle;

    private String companyUsername;

    private int companyNumber;

    private String companyCounty;

    private String companyDistrict;

    private String companyAddress;

    private String companyEmail;

    private String companyValidType;
}
