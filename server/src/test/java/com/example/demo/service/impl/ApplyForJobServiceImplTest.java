package com.example.demo.service.impl;

import com.example.demo.dao.apply.ApplyDao;
import com.example.demo.dao.vacancies.VacanciesRepository;
import com.example.demo.dto.applyforjob.ApplyCompanyDto;
import com.example.demo.model.vacancies.Vacancies;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Service;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Service
class ApplyForJobServiceImplTest {
    @Autowired
    private ApplyDao applyForJobDao;
    @Autowired
    private VacanciesRepository vacanciesRepository;
    @Test
    public void getCompany(){

        ApplyCompanyDto applyCompanyDto = applyForJobDao.findByVacanciesId("V2023032417");
        System.out.println(applyCompanyDto.getVacanciesName());
        assertEquals("1",applyCompanyDto.getVacanciesName());
//        assertEqual("1",applyCompanyDto.getVacanciesName());
    }
    @Test
    public void getVacancies(){

        Vacancies vacancies = vacanciesRepository.findById("V2023032414").orElseThrow(()->new RuntimeException("沒有此職缺"));
        System.out.println(vacancies);
        assertEquals("1",vacancies.getVacanciesName());
//        assertEqual("1",applyCompanyDto.getVacanciesName());
    }
}