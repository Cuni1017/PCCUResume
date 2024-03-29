package com.example.demo.dao;

import com.example.demo.model.User;
import com.example.demo.model.UserLike;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserLikeRepository extends JpaRepository<UserLike, String> {
    List<UserLike> findByUserId(String userId);

    @Transactional
    void deleteByVacanciesIdAndUserId(String  vacanciesId,String userId);
}
