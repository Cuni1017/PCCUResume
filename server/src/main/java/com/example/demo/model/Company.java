package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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





}
