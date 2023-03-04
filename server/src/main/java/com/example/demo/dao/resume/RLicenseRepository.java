package com.example.demo.dao.resume;

import com.example.demo.model.resume.RLicense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RLicenseRepository extends JpaRepository<RLicense,String> {

    List<RLicense> findByUserIdAndResumeId(String userId, String resumeId);
}
