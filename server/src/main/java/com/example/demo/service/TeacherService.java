package com.example.demo.service;

import com.example.demo.category.RoleCategory;

public interface TeacherService {
    Object findNewsById(String teacherId);

    Object findStudentReview(String teacherId);

    Object updateStudentRole(String teacherId, String studentId, RoleCategory roleCategory);

    Object findStudentByRole(String teacherId, String studentId);

    Object findCompanyByRole(String teacherId, String companyId);

    Object updateCompanyByRole(String teacherId, String companyId,RoleCategory roleCategory);

    Object findVacanciesByTeacherValidType(String teacherId);
}
