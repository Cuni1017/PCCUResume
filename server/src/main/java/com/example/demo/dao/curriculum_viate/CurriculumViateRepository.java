package com.example.demo.dao.curriculum_viate;

import com.example.demo.model.resume.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CurriculumViateRepository extends JpaRepository<Resume,String> {
    @Override
    List<Resume> findAll();
}
