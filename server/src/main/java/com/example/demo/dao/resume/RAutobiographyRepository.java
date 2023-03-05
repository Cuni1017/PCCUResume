package com.example.demo.dao.resume;

import com.example.demo.model.resume.RAutobiography;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.print.DocFlavor;
import java.util.List;
import java.util.Optional;
@Repository
public interface RAutobiographyRepository extends JpaRepository<RAutobiography,String> {

    RAutobiography findByUserIdAndResumeId(String userId, String resumeId);
    @Modifying
    @Transactional
    void deleteByUserIdAndResumeId(String UserId,String resumeId );
}
