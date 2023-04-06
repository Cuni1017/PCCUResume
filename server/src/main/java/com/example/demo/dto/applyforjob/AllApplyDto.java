package com.example.demo.dto.applyforjob;

import com.example.demo.dto.ApplyUserDto;
import com.example.demo.model.vacancies.Vacancies;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AllApplyDto {
    List<ApplyUserDto> ApplyUserDto;
    Vacancies vacancies;
}
