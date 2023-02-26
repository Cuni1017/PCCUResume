package com.example.demo.dao;

import com.example.demo.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StudentRepository extends JpaRepository<Student,String> {
    @Query(value = "select count(s) from Student s WHERE 'student_id' = :studentId ")
    Integer findStudentCountById(int studentId);
}
