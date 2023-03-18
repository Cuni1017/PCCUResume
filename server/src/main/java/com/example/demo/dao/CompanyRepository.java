package com.example.demo.dao;

import com.example.demo.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface CompanyRepository extends JpaRepository<Company,String> {
    Optional<Company> findByCompanyUsername(String companyUsername);
    //要改名字
    //MODEL層的COMPANY
}
