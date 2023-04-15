package com.example.demo.dao;

import com.example.demo.dao.apply.ApplyDao;
import com.example.demo.model.Role;
import com.example.demo.model.Student;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Service
class StudentRepositoryTest {
    @Autowired
    private StudentRepository studentRepository;
    @Test
    public void  run(){
        System.out.println(studentRepository.findByCreateTimeAfterAndRole(LocalDate.now(), Role.STUDENT_USER.toString()));
    }
}