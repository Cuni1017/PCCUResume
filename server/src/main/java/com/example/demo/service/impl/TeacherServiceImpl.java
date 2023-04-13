package com.example.demo.service.impl;

import com.example.demo.dao.ApplyRepository;
import com.example.demo.dao.CompanyRepository;
import com.example.demo.dao.StudentRepository;
import com.example.demo.dao.vacancies.VacanciesRepository;
import com.example.demo.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {
    private final ApplyRepository applyRepository;
    private final CompanyRepository companyRepository;
    private final VacanciesRepository vacanciesRepository;
    private final StudentRepository studentRepository;
    @Override
    public Object findNewsById(String teacherId) {
//        Student student
        return null;
    }
}
