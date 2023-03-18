package com.example.demo.service;

import com.example.demo.category.VacanciesCategory;
import org.springframework.stereotype.Service;

@Service
public interface CompanyService {
    Object createVacancies(String companyId,VacanciesCategory vacanciesCategory);

    Object getVacanciesSkillAndCounty(String companyId);
}