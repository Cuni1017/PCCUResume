package com.example.demo.dto.vacancies;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class PageVacanciesDto {
   private String company_id;
   private String company_name;
   private String vacancies_id;
   private String teacher_id;
   private String vacancies_name;
   private String vacancies_time;
   private String vacancies_work_experience;
   private String vacancies_Education;
   private String vacancies_department;
   private String vacancies_quantity;
   private LocalDate vacancies_create_time;
   private LocalDate vacancies_end_time;
   private int apply_count;
   private String skills;
   private String countys;
   private int vacancies_view;
   private int vacancies_down_salary;
   private Long vacancies_top_salary;
   private String vacancies_salary_type;
}
