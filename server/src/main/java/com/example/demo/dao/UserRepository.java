package com.example.demo.dao;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {


  Optional<User> findByEmail(String email);
//  @Query(value = "select id,username,password,email from User WHERE username = :username")
  Optional<User> findByUsername(String username);
  Optional<User> findById(String Id);
  void deleteById(String Id);
  @Query(value = "update user set isValid = :isValid , role = :role where id = :id", nativeQuery = true)
  void  updateRoleById(int isValid, Role role, String id);
  @Query(value = "select * from user where email = :email", nativeQuery = true)
  Optional<User> findBymyEmail(String email);
}
