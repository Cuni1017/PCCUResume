package com.example.demo.dao;

import com.example.demo.dto.TeacherDto;
import com.example.demo.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher,String> {

    Optional<Teacher> findByTeacherUsername(String TeacherUsername);

    Optional<Teacher> findByTeacherId(String teacherId);
}
