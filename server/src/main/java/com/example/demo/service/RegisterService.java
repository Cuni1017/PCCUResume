package com.example.demo.service;

import com.example.demo.dto.StudentRegisterRequest;
import com.example.demo.dto.CompanyRegisterDto;
import com.example.demo.dto.TeacherRegisterDto;

public interface RegisterService {
    //String checkEmail(String studentId, JpaRepository jpaRepository, checkEmailDto request);
    Object studentRegister(StudentRegisterRequest request);
    Object companyRegister(CompanyRegisterDto request);
    Object teacherRegister(TeacherRegisterDto request);
    Object sendEmail(String email);
}
