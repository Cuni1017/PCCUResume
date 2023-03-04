package com.example.demo.dao.resume;

import com.example.demo.model.resume.RSpecialSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RSpecialSkillRepository extends JpaRepository<RSpecialSkill,String> {

    List<RSpecialSkill> findByUserIdAndResumeId(String studentId, String resumeId);
}
