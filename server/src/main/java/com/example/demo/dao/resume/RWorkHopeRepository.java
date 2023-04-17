package com.example.demo.dao.resume;

import com.example.demo.model.resume.RWorkHope;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RWorkHopeRepository extends JpaRepository<RWorkHope,String> {

    RWorkHope findByUserIdAndResumeId(String studentId, String resumeId);
    RWorkHope findByResumeId( String resumeId);
    @Modifying
    @Transactional
    void deleteByUserIdAndResumeId(String userId, String resumeId);

    @Modifying
    @Transactional
    void deleteByUserIdAndResumeIdAndId(String userId, String resumeId,String id);
}
