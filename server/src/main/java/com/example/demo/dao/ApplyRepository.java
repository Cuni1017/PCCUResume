package com.example.demo.dao;

import com.example.demo.model.Apply;
import com.example.demo.model.vacancies.Vacancies;
import com.example.demo.rowmapper.CompanyVacanciesRowMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public interface ApplyRepository extends JpaRepository<Apply,String> {
    List<Apply> findByVacanciesId(String vacanciesId);

    @Query(value = "SELECT v.* FROM vacancies v \n" +
            "INNER JOIN apply a ON a.vacancies_id = v.vacancies_id \n"+
            "INNER JOIN company c ON c.company_id = v.company_id \n" +
            "INNER JOIN student s ON s.student_id = a.user_id \n"+
            "WHERE s.student_name = :studentName",nativeQuery = true)
    List<Vacancies> findVacanciesByStudentName(String studentName);




}
