package com.example.demo.dao;

import com.example.demo.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill,Integer> {
    @Query(value = "SELECT skill_name FROM skill",nativeQuery = true)
    List<String> findSkillName();
}
