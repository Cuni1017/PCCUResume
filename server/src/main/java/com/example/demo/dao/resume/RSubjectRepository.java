package com.example.demo.dao.resume;

import com.example.demo.model.resume.RSubject;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RSubjectRepository extends JpaRepository<RSubject,String> {

    @Modifying
    @Transactional
    void deleteByUserIdAndResumeId(String userId, String resumeId);
//    @Modifying
//    @Transactional
//    void deleteByUserIdAndResumeIdAndId(String userId, String resumeId,String id);
    List<RSubject> findByResumeId(String resumeId);
    List<RSubject> findByUserIdAndResumeId(String userId, String resumeId);
}
