package com.example.demo.dao.vacancies;

import com.example.demo.model.vacancies.VacanciesCounty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VacanciesCountyRepository extends JpaRepository<VacanciesCounty,String> {

}
