package com.example.demo.service;

import com.example.demo.category.VacanciesCategory;

import java.util.List;

public interface VacanciesService {


    Object findPageVacancies( List<String> county,List<String> technology,  String salaryType, Long salaryMax, int salaryMin, String order, int page, int limit);

    Object findVacanciesById(String vacanciesId);
    Object findSkills();

    Object findCounties();


}
