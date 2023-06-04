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
@Table(name = "user_like")
public class UserLike {
    @Id
    @Column(name = "user_like_id" )
    private String userLikeId;
    @Column(name = "user_id" )
    private String userId     ;
    @Column(name = "company_id" )
    private String companyId  ;
    @Column(name = "vacancies_id" )
    private String vacanciesId;
}
