package com.example.demo.dao;

import com.example.demo.model.CompanyAboutBasic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyAboutBsicRepository extends JpaRepository<CompanyAboutBasic,String> {
}
