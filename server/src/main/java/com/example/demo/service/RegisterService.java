package com.example.demo.service;

import com.example.demo.auth.StudentRegisterRequest;
import com.example.demo.dto.CompanyRegisterDto;
import com.example.demo.dto.TeacherRegisterDto;
import com.example.demo.dto.checkEmailDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegisterService {
    String checkEmail(String studentId, JpaRepository jpaRepository, checkEmailDto request);
    String studentRegister(StudentRegisterRequest request);
    String companyRegister(CompanyRegisterDto request);
    String teacherRegister(TeacherRegisterDto request);
}
