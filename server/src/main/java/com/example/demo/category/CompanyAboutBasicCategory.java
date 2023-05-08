package com.example.demo.category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class CompanyAboutBasicCategory {
    private String companyName;
    private int companyNumber;
    private int companyAboutContactNumber;
    private String companyAboutUrl;
    private String companyAboutEmployeeQuantity;
    private Integer companyAboutHaveMoney;
    private String companyAboutTalk;
    private String companyAboutContactPerson;
    private String companyAboutEnvironment;


}
