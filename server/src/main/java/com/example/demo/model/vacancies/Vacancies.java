package com.example.demo.model.vacancies;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.util.Date;
@DynamicUpdate
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vacancies")
public class Vacancies {
    @Id
    @Column(name = "vacancies_id")
    private String id;
    @Column(name = "company_id")
    private String companyId;
    @Column(name = "teacher_id")
    private String teacherId;
    @Column(name = "vacancies_name")
    private String vacanciesName;

    @Column(name = "vacancies_time")
    private String vacanciesTime;

    @Column(name = "vacancies_work_experience")
    private String vacanciesWorkExperience;
    @Column(name = "vacancies_Education")
    private String vacanciesEducation;
    @Column(name = "vacancies_department")
    private String vacanciesDepartment;
    @Column(name = "vacancies_other")
    private String vacanciesOther;
    @Column(name = "vacancies_safe")
    private String vacanciesSafe;
    @Column(name = "vacancies_create_time")
    private LocalDate vacanciesCreateTime;
    @Column(name = "vacancies_end_time")
    private Date vacanciesEndTime;
    @Column(name = "vacancies_district")
    private String vacanciesDistrict;
    @Column(name = "vacancies_address")
    private String vacanciesAddress;
    @Column(name = "vacancies_salary_type")
    private String vacanciesSalaryType;
    @Column(name = "vacancies_top_salary")
    private int vacanciesTopSalary;
    @Column(name = "vacancies_down_salary")
    private int vacanciesDownSalary;
    @Column(name = "vacancies_description")
    private String vacanciesDescription;
    @Column(name = "vacancies_requirement")
    private String vacanciesRequirement;
    @Column(name = "apply_count")
    private int  applyCount;
    @Column(name = "vacancies_quantity")
    private int  vacanciesQuantity;
    @Column(name = "vacancies_view")
    private int vacanciesView;
    @Column(name = "teacher_valid_type")
    private String teacherValidType;
    @Column(name = "vacancies_condition")
    private String vacanciesCondition;

    @Column(name = "vacancies_watch_type")
    private String vacanciesWatchType;
}
