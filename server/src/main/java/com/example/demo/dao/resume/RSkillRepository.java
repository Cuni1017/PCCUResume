package com.example.demo.dao.resume;

import com.example.demo.model.resume.RSkill;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface RSkillRepository extends JpaRepository<RSkill,String> {
    List<RSkill> findByResumeId(String resumeId);
    @Modifying
    @Transactional
    void deleteByResumeId(String resumeId);
}
