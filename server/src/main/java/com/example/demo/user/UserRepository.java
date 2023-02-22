package com.example.demo.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {


  Optional<User> findByEmail(String email);
//  @Query(value = "select id,username,password,email from User WHERE username = :username")
  Optional<User> findByUsername(String username);
}
