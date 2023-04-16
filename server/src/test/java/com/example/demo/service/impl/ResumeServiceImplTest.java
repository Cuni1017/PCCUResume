package com.example.demo.service.impl;

import com.example.demo.model.Student;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Service
class ResumeServiceImplTest {
    @Test
    public void createskill(){
        List<Student> students =  studentRepository.findByRole("STUDENT_USER");
        System.out.println(students);
    }
}