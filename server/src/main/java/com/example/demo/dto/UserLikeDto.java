package com.example.demo.dto;

import com.example.demo.dto.vacancies.FullVacanciesDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class UserLikeDto {
    private FullVacanciesDto fullVacanciesDto;

}
