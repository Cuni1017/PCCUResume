package com.example.demo.dao;

import com.example.demo.model.Teacher;
import com.example.demo.model.TeacherFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherFileRepository extends JpaRepository<TeacherFile,String> {
}
