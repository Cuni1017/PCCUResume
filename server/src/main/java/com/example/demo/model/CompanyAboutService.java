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
@Table(name = "company_about_service")
public class CompanyAboutService {
    @Id
    @Column(name = "company_id")
    private String companyId;

    @Column(name = "company_about_service")
    private String companyAboutService;

    @Column(name = "company_about_mission")
    private String companyAboutMission;

    @Column(name = "company_about_media")
    private String companyAboutMedia;

    @Column(name = "company_twitter_url")
    private String companyTwitterUrl;

    @Column(name = "company_facebook_url")
    private String companyFacebookUrl;

    @Column(name = "company_instagram_url")
    private String companyInstagramUrl;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;


}