package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompanyAboutDto {
    private String companyId;
    private String aboutUrl;
    private String employeeQuantity;
    private Integer haveMoney;
    private String backgroundImageUrl;
    private String talk;
    private String contactPerson;
    private String logoImageUrl;
    private String environment;
    private String logoSavePath;
    private String backgroundSavePath;
    private String service;
    private String mission;
    private String media;
    private String twitterUrl;
    private String facebookUrl;
    private String instagramUrl;
    private String welfare;

    // constructors, getters, and setters
}