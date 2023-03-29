package com.example.demo.model.vacancies;

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
@Table(name = "vacancies_county")
public class VacanciesCounty {
    @EmbeddedId
    private VacanciesCountyId vacanciesCountyId;

}
