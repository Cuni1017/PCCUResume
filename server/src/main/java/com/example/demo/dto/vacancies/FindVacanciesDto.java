package com.example.demo.dto.vacancies;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class FindVacanciesDto {
    Page PageVacancies;
    List<String> technology;
    List<String> county;

}
