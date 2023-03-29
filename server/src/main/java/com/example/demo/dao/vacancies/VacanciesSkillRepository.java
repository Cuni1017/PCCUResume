package com.example.demo.dao.vacancies;

import com.example.demo.model.vacancies.VacanciesSkill;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VacanciesSkillRepository extends JpaRepository<VacanciesSkill,String> {
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM vacancies_skill  WHERE vacancies_id = :vacanciesId",nativeQuery = true)
    void deleteByVacanciesId(@Param("vacanciesId") String vacanciesId);
}
