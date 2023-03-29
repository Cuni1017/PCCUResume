package com.example.demo.dao;

import com.example.demo.model.HistoryApply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryApplyRepository extends JpaRepository<HistoryApply,String> {
}
