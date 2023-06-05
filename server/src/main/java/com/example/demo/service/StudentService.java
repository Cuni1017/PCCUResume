package com.example.demo.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface StudentService {

    Object findUserById(String studentUsername);

    Object uploadStudentImage(String studentUsername, MultipartFile uploadFile, HttpServletRequest httpServletRequest);

    Object deleteStudentImage(String studentUsername);

    Object findTeacherFileForm(String fileType, int page, int limit);

    ResponseEntity<Object> downloadTeacherFile(String studentUsername, String teacherFileId, HttpServletResponse response);
}
