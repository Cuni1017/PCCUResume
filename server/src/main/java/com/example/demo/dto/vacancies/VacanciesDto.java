package com.example.demo.dto.vacancies;

import com.example.demo.model.County;
import com.example.demo.model.Skill;
import com.example.demo.model.vacancies.Vacancies;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VacanciesDto {
    Vacancies vacancies;
    List<Integer> skills;
    List<Integer> county;
}
