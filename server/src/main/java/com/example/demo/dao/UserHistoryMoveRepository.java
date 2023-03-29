package com.example.demo.dao;

import com.example.demo.model.HistoryUserMove;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserHistoryMoveRepository extends JpaRepository<HistoryUserMove,String> {
}
