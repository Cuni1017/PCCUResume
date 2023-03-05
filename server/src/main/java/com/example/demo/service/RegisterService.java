package com.example.demo.service;

import com.example.demo.dto.StudentRegisterRequest;
import com.example.demo.dto.CompanyRegisterDto;
import com.example.demo.dto.TeacherRegisterDto;

public interface RegisterService {
    //String checkEmail(String studentId, JpaRepository jpaRepository, checkEmailDto request);
    String studentRegister(StudentRegisterRequest request);
    String companyRegister(CompanyRegisterDto request);
    String teacherRegister(TeacherRegisterDto request);
    String sendEmail(String email);
}
