package com.example.demo.dao.resume;

import com.example.demo.model.resume.RWorkHope;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RWorkHopeRepository extends JpaRepository<RWorkHope,String> {

    RWorkHope findByUserIdAndResumeId(String studentId, String resumeId);
}
