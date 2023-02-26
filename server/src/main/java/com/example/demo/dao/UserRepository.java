package com.example.demo.dao;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {


  Optional<User> findByEmail(String email);
//  @Query(value = "select id,username,password,email from User WHERE username = :username")
  Optional<User> findByUsername(String username);
  Optional<User> findById(String Id);
  void deleteById(String Id);
}
