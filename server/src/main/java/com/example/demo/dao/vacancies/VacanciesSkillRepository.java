package com.example.demo.dao.vacancies;

import com.example.demo.model.vacancies.VacanciesSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VacanciesSkillRepository extends JpaRepository<VacanciesSkill,String> {
}
