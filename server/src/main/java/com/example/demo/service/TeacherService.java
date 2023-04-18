package com.example.demo.service;

import com.example.demo.category.RoleCategory;

public interface TeacherService {
    Object findNewsById();


    Object updateStudentRole(String teacherId, String studentId, RoleCategory roleCategory);

    Object findStudentByRole(int page , int limit);

    Object findCompanyByRole(int page , int limit);

    Object updateCompanyByRole(String teacherId, String companyId,RoleCategory roleCategory);

    Object findVacanciesByTeacherValidType(int page , int limit);
}
