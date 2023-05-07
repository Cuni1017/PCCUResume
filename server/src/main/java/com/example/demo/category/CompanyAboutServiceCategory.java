package com.example.demo.category;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyAboutServiceCategory {
    private String companyAboutService;
    private String companyAboutMission;
    private String companyAboutMedia;
    private String companyTwitterUrl;
    private String companyFacebookUrl;

    private String companyInstagramUrl;
}

