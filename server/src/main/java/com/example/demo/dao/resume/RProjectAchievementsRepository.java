package com.example.demo.dao.resume;

import com.example.demo.model.resume.RProjectAchievements;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface RProjectAchievementsRepository extends JpaRepository<RProjectAchievements,String> {

    List<RProjectAchievements> findByUserIdAndResumeId(String userId, String resumeId);
    List<RProjectAchievements> findByResumeId( String resumeId);
    @Modifying
    @Transactional
    void deleteByUserIdAndResumeId(String userId, String resumeId);
    @Modifying
    @Transactional
    void deleteByUserIdAndResumeIdAndId(String userId, String resumeId,String id);
}
