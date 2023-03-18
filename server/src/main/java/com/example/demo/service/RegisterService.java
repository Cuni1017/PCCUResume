package com.example.demo.service;

import com.example.demo.category.StudentRegisterCategory;
import com.example.demo.category.CompanyRegisterCategory;
import com.example.demo.category.TeacherRegisterCategory;

public interface RegisterService {
    //String checkEmail(String studentId, JpaRepository jpaRepository, checkEmailDto request);
    Object studentRegister(StudentRegisterCategory request);
    Object companyRegister(CompanyRegisterCategory request);
    Object teacherRegister(TeacherRegisterCategory request);
    Object sendEmail(String email);
}
