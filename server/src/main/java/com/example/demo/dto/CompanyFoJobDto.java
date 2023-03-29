package com.example.demo.dto;

import com.example.demo.model.Apply;
import com.example.demo.model.vacancies.Vacancies;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;
@Data
@AllArgsConstructor
@Builder
public class CompanyFoJobDto {
    private List<ApplyUserDto> applyUserDto;
    private Vacancies vacancies;


}
