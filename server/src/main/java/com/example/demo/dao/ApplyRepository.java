package com.example.demo.dao;

import com.example.demo.model.Apply;
import com.example.demo.model.vacancies.Vacancies;
import com.example.demo.rowmapper.CompanyVacanciesRowMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public interface ApplyRepository extends JpaRepository<Apply,String> {
    List<Apply> findByVacanciesId(String vacanciesId);


    List<Apply> findByUserId(String userId);
    List<Apply> findByApplyUpdateTimeAfter(LocalDate ApplyUpdateTime);



}
