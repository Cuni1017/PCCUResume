package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.lang.model.element.Name;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "company_about")
public class CompanyAbout {
    @Id
    @Column(name = "company_about_id")
    private String companyAboutId;
    @Column(name = "companyId")
    private String companyId;
    @Column(name = "company_about_url")
    private String companyAboutUrl;
    @Column(name = "company_about_url")
    private String companyAboutEmployeeQuantity;
    @Column(name = "company_about_have_money")
    private int companyAboutHaveMoney;
    @Column(name = "company_about_background_image_url")
    private String companyAboutBackgroundImageUrl;
    @Column(name = "company_about_talk")
    private String companyAboutTalk;
    @Column(name = "company_about_contact_person")
    private String companyAboutContactPerson;
}
