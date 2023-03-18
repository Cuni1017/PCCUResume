package com.example.demo.model.vacancies;

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
@Table(name = "vacancies_county")
public class VacanciesCounty {
    @Id
    @Column(name = "vacancies_id")
    private String vacanciesId;
    @Column(name = "county_id")
    private int countyId;

}
