package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "company_about_basic")
public class CompanyAboutBasic {
    @Id
    @Column(name = "company_id")
    private String companyId                           ;
    @Column(name = "company_about_url")
    private String companyAboutUrl                    ;
    @Column(name = "company_about_employee_quantity")
    private String companyAboutEmployeeQuantity      ;
    @Column(name = "company_about_have_money")
    private int    companyAboutHaveMoney             ;
    @Column(name = "company_about_background_image_url")
    private String    companyAboutBackgroundImageUrl   ;
    @Column(name = "company_about_talk")
    private String companyAboutTalk                     ;
    @Column(name = "company_about_contact_person")
    private String companyAboutContactPerson       ;
    @Column(name = "company_about_logo_image_url")
    private String companyAboutLogoImageUrl       ;
    @Column(name = "company_about_environment")
    private String companyAboutEnvironment          ;
    @Column(name = "company_about_logo_save_path")
    private String companyAboutLogoSavePath;
    @Column(name = "company_about_background_save_path")
    private String companyAboutBackgroundSavePath;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private CompanyAboutService companyAboutService;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private CompanyAboutWelfare companyAboutWelfare;
}
