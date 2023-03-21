package com.example.demo.category;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class VacanciesCategory {
    private String vacanciesName;
    private String vacanciesTime;
    private String vacanciesContent;
    private String vacanciesWorkExperience;
    private String vacanciesEducation;
    private String vacanciesDepartment;
    private String vacanciesOther;
    private String vacanciesSafe;
    private String vacanciesWatchType;


    private String vacanciesDistrict;
    private String vacanciesAddress;
    private String vacanciesSalaryType;
    private int vacanciesTopSalary;
    private int vacanciesDownSalary;
    private String vacanciesDescription;
    private String vacanciesRequirement;

    private int vacanciesQuantity;

    private String vacanciesCondition;
    private List<Integer> skill;
    private List<Integer> county;
}