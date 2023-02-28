package com.example.demo.dao.resume;

import com.example.demo.model.resume.Resume;
import com.example.demo.model.resume.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;
import java.util.Optional;
@EnableJpaRepositories
public interface ResumeRepository extends JpaRepository<Resume,String> {
    @Override
    List<Resume> findAll();
    @Query(value = "INSERT INTO resume (id,user_id,number,school)  VALUES(:resumeId,:userId,:number,:school)", nativeQuery = true)
    Optional saveBasicResume(String resumeId, String userId, int number, School school);
}
