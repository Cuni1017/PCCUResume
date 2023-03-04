package com.example.demo.dao.resume;

import com.example.demo.model.resume.RProjectAchievements;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RProjectAchievementsRepository extends JpaRepository<RProjectAchievements,String> {

    Optional<RProjectAchievements> findByUserId(String userId);
}
