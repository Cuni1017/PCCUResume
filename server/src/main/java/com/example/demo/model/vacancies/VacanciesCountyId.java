package com.example.demo.model.vacancies;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class VacanciesCountyId implements Serializable {

    @Column(name = "vacancies_id")
    private String vacanciesId;
    @Column(name = "county_id")
    private int countyId;
}
