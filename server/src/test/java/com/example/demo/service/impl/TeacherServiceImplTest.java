package com.example.demo.service.impl;

import com.example.demo.dao.StudentRepository;
import com.example.demo.model.Role;
import com.example.demo.model.Student;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Service
class TeacherServiceImplTest {
    @Autowired
    private  StudentRepository studentRepository;
    @Test
    public void getStudentByRole(){
        List<Student> students =  studentRepository.findByRole("STUDENT_USER");
        System.out.println(students);
    }
}