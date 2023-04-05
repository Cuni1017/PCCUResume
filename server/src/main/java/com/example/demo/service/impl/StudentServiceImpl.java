package com.example.demo.service.impl;

import com.example.demo.config.error.UserNotFoundException;
import com.example.demo.dao.StudentRepository;
import com.example.demo.dao.UserRepository;
import com.example.demo.dao.resume.ResumeRepository;
import com.example.demo.dto.RestDto;
import com.example.demo.dto.StudentDto;
import com.example.demo.model.Student;
import com.example.demo.model.User;
import com.example.demo.model.resume.Resume;

import com.example.demo.reponse.student.StudentResponse;
import com.example.demo.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final ResumeRepository resumeRepository;
    @Override
    public Object findUserById(String studentUsername) {
        User user =userRepository.findByUsername(studentUsername).orElseThrow(() -> new UserNotFoundException("studentId:查無使用者"));
        Student student = studentRepository.findByStudentId(user.getId()).orElseThrow(() -> new UserNotFoundException("studentId:查無使用者"));
        StudentDto studentDto = StudentDto.builder()
                .studentId(student.getStudentId())
                .studentImageUrl(student.getStudentImageUrl())
                .studentEmail(student.getStudentEmail())
                .studentName(student.getStudentName())
                .studentUsername(student.getStudentUsername())
                .pccuId(student.getPccuId())
                .role(user.getRole().toString())
                .studentNumber(student.getStudentNumber())
                .build();
        RestDto restResponse =RestDto.builder()
                .data(studentDto)
                .message("查詢成功")
                .build();
        return  restResponse;
    }
}
