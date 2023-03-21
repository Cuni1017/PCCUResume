package com.example.demo.dto.vacancies;

import com.example.demo.model.Company;
import com.example.demo.model.vacancies.Vacancies;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FullVacanciesDto {
   private Company company;
   private Vacancies vacancies;
   private String skills;
   private String county;
}
