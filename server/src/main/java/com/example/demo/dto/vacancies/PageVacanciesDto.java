package com.example.demo.dto.vacancies;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageVacanciesDto {
   private List<CompanyVacanciesDto> companyVacanciesDto;
   private int total;
   private int page;
   private int size;
}
