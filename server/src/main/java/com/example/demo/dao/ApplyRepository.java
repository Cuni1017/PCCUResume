package com.example.demo.dao;

import com.example.demo.model.Apply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplyRepository extends JpaRepository<Apply,String> {
    List<Apply> findByVacanciesId(String vacanciesId);
}
