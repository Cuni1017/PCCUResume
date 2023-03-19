package com.example.demo.service;

import com.example.demo.category.VacanciesCategory;

import java.util.List;

public interface VacanciesService {


    Object findAll( List<String> technology, String order, List<String> county, String salaryType, Long salaryMax, int salaryMin, int page, int limit);

    Object findSkills();

    Object findCounties();
}
