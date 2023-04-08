package com.example.demo.dao;

import com.example.demo.model.CompanyAbout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyAboutRepository extends JpaRepository<CompanyAbout,String> {
}
