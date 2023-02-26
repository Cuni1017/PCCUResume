package com.example.demo.dao.curriculum_viate;

import com.example.demo.model.resume.RLicense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CvLicenseRepository extends JpaRepository<RLicense,String> {
}
