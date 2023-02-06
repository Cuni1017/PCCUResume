package com.example.server.dao;
import com.example.server.model.Login;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginRepository  extends CrudRepository<Login,String> {
    @Override
    List<Login> findAll();
}
