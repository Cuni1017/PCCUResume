package com.example.demo.service;

import com.example.demo.category.VacanciesCategory;
import com.example.demo.model.User;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface VacanciesService {


    Object findPageVacancies( List<String> county,List<String> technology,  String salaryType, Long salaryMax, int salaryMin, String order, int page, int limit , User user);

    Object findFullVacanciesById(String vacanciesId);
    Object findSkills();

    Object findCounties();


}
