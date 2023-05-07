package com.example.demo.dao;

import com.example.demo.model.CompanyAboutWelfare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
    public interface CompanyAboutWelfareRepository extends JpaRepository<CompanyAboutWelfare,String> {
}
