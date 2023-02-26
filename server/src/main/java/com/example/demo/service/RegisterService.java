package com.example.demo.service;

import com.example.demo.auth.StudentRegisterRequest;
import com.example.demo.model.Company;
import com.example.demo.model.Teacher;
import com.example.demo.model.User;
import com.example.demo.request.CompanyRegisterRequest;
import com.example.demo.request.TeacherRegisterRequest;
import com.example.demo.request.checkEmailRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegisterService {
    String checkEmail(String studentId, JpaRepository jpaRepository, checkEmailRequest request);
    String studentRegister(StudentRegisterRequest request);
    String companyRegister(CompanyRegisterRequest request);
    String teacherRegister(TeacherRegisterRequest request);
}
