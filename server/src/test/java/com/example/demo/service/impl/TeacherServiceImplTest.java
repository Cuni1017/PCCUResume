package com.example.demo.service.impl;

import com.example.demo.dao.StudentRepository;
import com.example.demo.dao.vacancies.VacanciesDao;
import com.example.demo.dto.CompanyVacanciesDto;
import com.example.demo.dto.vacancies.PageVacanciesDto;
import com.example.demo.model.Role;
import com.example.demo.model.Student;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Service
class TeacherServiceImplTest {
    @Autowired
    private  StudentRepository studentRepository;
    @Autowired
    private VacanciesDao vacanciesDao;
    @Test
    public void getStudentByRole(){
        List<Student> students =  studentRepository.findByRole(Role.STUDENT_USER.toString(),10,0);
        System.out.println(students);
    }
    @Test
    public void findVacanciesByTeacherValidType(){
        int page = 1;
        int limit = 10;
        int selectOffset = getSelectOffset(page,limit);
        int selectLimit = getSelectLimit(page,limit);
        List<CompanyVacanciesDto> companyVacanciesDtos = vacanciesDao.findPageVacanciesReview(selectLimit,selectOffset);
        long total = companyVacanciesDtos.stream().count();
        int intTotal = (int)total;
        PageVacanciesDto pageVacanciesDto = PageVacanciesDto.builder()
                .companyVacanciesDto(companyVacanciesDtos)
                .page(page)
                .size(limit)
                .total(intTotal)
                .build();
        System.out.println(pageVacanciesDto);
    }
    private int getSelectOffset(int page,int limit){
        return (page-1)*limit;
    }
    private int getSelectLimit(int page,int limit){
        return page*limit;
    }
}