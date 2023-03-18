package com.example.demo.service.impl;

import com.example.demo.config.error.UserNotFoundException;
import com.example.demo.dao.StudentRepository;
import com.example.demo.dao.UserRepository;
import com.example.demo.dao.resume.ResumeRepository;
import com.example.demo.dto.RestDto;
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
    public Object findUserById(String studentId) {
        User user =userRepository.findById(studentId).orElseThrow(() -> new UserNotFoundException("studentId:查無使用者"));
        Student student = studentRepository.findByStudentId(studentId).orElseThrow(() -> new UserNotFoundException("studentId:查無使用者"));
        List<Resume> resume =resumeRepository.findByUserId(studentId);
        StudentResponse studentResponse =StudentResponse.builder()
                .student(student)
                .resume(resume)
                .build();
        RestDto restResponse =RestDto.builder()
                .data(studentResponse)
                .message("新建成功")
                .build();
        return  restResponse;
    }
}
