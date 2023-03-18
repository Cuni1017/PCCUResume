package com.example.demo.dto.vacancies;

import com.example.demo.model.Company;
import com.example.demo.model.vacancies.Vacancies;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class CompanyVacanciesDto {

    Vacancies vacancies;
    String skills;
    String counties;
}
