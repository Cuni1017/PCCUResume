package com.example.demo.dao.vacancies;

import com.example.demo.model.vacancies.VacanciesCounty;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VacanciesCountyRepository extends JpaRepository<VacanciesCounty,String> {
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM vacancies_county vc WHERE vc.vacancies_id = :vacanciesId",nativeQuery = true)
    void deleteByVacanciesId(@Param("vacanciesId") String vacanciesId);
}
