package com.example.demo.dao;

import com.example.demo.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student,String> {
    @Query(value = "select count(s) from Student s WHERE 'student_id' = :studentId ")
    Integer findStudentCountById(int studentId);
//    List<Student> findByStudentCreateTimeAfter

    Optional<Student> findByStudentId(String s);
    Optional<Student> findByStudentUsername(String username);
    @Query(nativeQuery = true ,value = "select s.* from Student s inner join user u on u.id = s.student_id WHERE s.student_create_time > :creatTime and u.role = :role")
    List<Student> findByCreateTimeAfterAndRole(LocalDate creatTime ,String role);

    @Query(value = "select s.* from Student s inner join user u where  u.role = :role",nativeQuery = true)
    List<Student>  findByRole(String role);
}
