package com.example.demo.dao.resume;

import com.example.demo.model.resume.RSpecialSkill;
import com.example.demo.model.resume.RWorkExperience;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface RWorkExperienceRepository extends JpaRepository<RWorkExperience,String> {
    void deleteByUserIdAndResumeId(String userId, String resumeId);
    List<RWorkExperience> findByResumeId( String resumeId);
    @Modifying
    @Transactional
    List<RWorkExperience> findByUserIdAndResumeId(String studentId, String resumeId);

    @Modifying
    @Transactional
    void deleteByUserIdAndResumeIdAndId(String userId, String resumeId,String id);
}
