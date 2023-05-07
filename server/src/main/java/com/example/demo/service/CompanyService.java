package com.example.demo.service;

import com.example.demo.category.VacanciesCategory;
import com.example.demo.category.VacanciesWatchTypeCategory;
import org.springframework.stereotype.Service;

@Service
public interface CompanyService {
    Object createVacancies(String companyId,VacanciesCategory vacanciesCategory);


    Object findVacanciesByCompanyName(String companyName,int page,int limit);


    Object updateVacancies(String companyName, String vacanciesId, VacanciesCategory vacanciesCategory);

    Object deleteVacancies(String companyName, String vacanciesId);


    Object findCompanyByCompanyName(String companyName);


    Object updateVacanciesWatchType(String vacanciesId, VacanciesWatchTypeCategory vacanciesWatchTypeCategory);
}
