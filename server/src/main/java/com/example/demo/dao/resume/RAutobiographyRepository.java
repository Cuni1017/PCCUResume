package com.example.demo.dao.resume;

import com.example.demo.model.resume.RAutobiography;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.print.DocFlavor;
import java.util.Optional;

public interface RAutobiographyRepository extends JpaRepository<RAutobiography,String> {

    Optional<RAutobiography> findByUserId(String userId);
}