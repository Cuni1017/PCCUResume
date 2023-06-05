package com.example.demo.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

public interface StudentService {

    Object findUserById(String studentUsername);

    Object uploadStudentImage(String studentUsername, MultipartFile uploadFile, HttpServletRequest httpServletRequest);

    Object deleteStudentImage(String studentUsername);
}
