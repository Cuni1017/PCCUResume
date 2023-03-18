package com.example.demo.dao;

import com.example.demo.model.County;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountyRepository extends JpaRepository<County,Integer> {
    @Query(value = "SELECT county_name from county",nativeQuery = true)
    List<String> findCountyName();
}
