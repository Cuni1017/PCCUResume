package com.example.demo.dto;

import com.example.demo.dto.applyforjob.AllApplyDto;
import com.example.demo.model.Company;
import com.example.demo.model.Student;
import com.example.demo.model.vacancies.Vacancies;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class NewsDto {
    List<Student> students;
    List<Company> companies;
    List<Vacancies> vacancies;
    List<AllApplyDto> allApplyDtoList;
}
