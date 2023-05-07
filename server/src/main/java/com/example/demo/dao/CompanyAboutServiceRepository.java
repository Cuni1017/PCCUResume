package com.example.demo.dao;

import com.example.demo.model.CompanyAboutService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyAboutServiceRepository extends JpaRepository<CompanyAboutService,String> {
}
