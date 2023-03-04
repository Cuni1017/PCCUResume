package com.example.demo.dao.resume;

import com.example.demo.model.resume.RWorkExperience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RWorkExperienceRepository extends JpaRepository<RWorkExperience,String> {
    List<RWorkExperience> findByUserIdAndResumeId(String studentId, String resumeId);
}
