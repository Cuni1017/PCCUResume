package com.example.demo.dto.vacancies;

import com.example.demo.dto.CompanyVacanciesDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
