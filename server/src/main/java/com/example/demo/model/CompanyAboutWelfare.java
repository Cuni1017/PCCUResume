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
@Table(name = "company_about_welfare")
public class CompanyAboutWelfare {
    @Id
    @Column(name = "companyId")
    private String companyId;
    @Column(name = "company_about_welfare")
    private String companyAboutWelfare;

}
