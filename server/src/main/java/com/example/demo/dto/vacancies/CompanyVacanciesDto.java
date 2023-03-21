package com.example.demo.dto.vacancies;

import com.example.demo.model.Company;
import com.example.demo.model.vacancies.Vacancies;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompanyVacanciesDto {
    private String companyId;
    private String companyName;
    private String companyImageUrl;
    private String vacanciesId;
    private String teacherId;
    private String vacanciesName;
    private String vacanciesTime;
    private String vacanciesDescription;
    private String vacanciesRequirement;
    private String vacanciesWorkExperience;
    private String vacanciesEducation;
    private String vacanciesDepartment;
    private String vacanciesQuantity;
    private LocalDate vacanciesCreateTime;
<<<<<<< HEAD

=======
    private String vacanciesEndTime;
>>>>>>> a7671fe9c83b0acaa9ffe520f58a9731e1af5659
    private int applyCount;

    private int vacanciesView;
    private int vacanciesDownSalary;
    private Long vacanciesTopSalary;
    private String vacanciesSalaryType;
    private String skills;
    private String county;
}
