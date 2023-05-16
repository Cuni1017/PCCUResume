package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "company")
public class Company {
    @Id
    @Column(name = "company_id")
    private String companyId;
    @Column(name = "company_name")
    private String companyName;
    @Column(name = "company_image_url")
    private String companyImageUrl;
    @Column(name = "company_title")
    private String companyTitle;
    @Column(name = "company_username")
    private String companyUsername;
    @Column(name = "company_password")
    private String companyPassword;
    @Column(name = "company_number")
    private int companyNumber;
    @Column(name = "company_county")
    private String companyCounty;
    @Column(name = "company_district")
    private String companyDistrict;
    @Column(name = "company_address")
    private String companyAddress;
    @Column(name = "company_email")
    private String companyEmail;
    @Column(name = "company_valid_type")
    private String companyValidType;
    @Column(name = "company_create_time")
    private LocalDate companyCreateTime;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private CompanyAboutService companyAboutService;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private CompanyAboutWelfare companyAboutWelfare;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private CompanyAboutBasic companyAboutBasic;



}
