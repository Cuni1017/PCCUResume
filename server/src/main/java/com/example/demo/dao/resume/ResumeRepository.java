package com.example.demo.dao.resume;

import com.example.demo.model.resume.Resume;
import com.example.demo.model.resume.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;
import java.util.Optional;
@EnableJpaRepositories
public interface ResumeRepository extends JpaRepository<Resume,String> {
    //Optional<List<Resume>> findAllResume();
    @Query(value = "SELECT rm.* , ra. FROM resume as rm " +
            "LEFT JOIN r_autobiography AS ra ON ra.resume_id = rm.id " +
            "LEFT JOIN r_license AS rl ON rl.resume_id = rm.id " +
            "LEFT JOIN r_project_achievements AS rpa ON rpa.resume_id = rm.id " +
            "LEFT JOIN r_special_skill AS rsk ON rsk.resume_id = rm.id " +
            "LEFT JOIN r_work_experience AS rwe ON rwe.resume_id = rm.id " +
            "LEFT JOIN r_work_hope AS rwh ON rwh.resume_id = rm.id " +
            "Where rm.user_id = :studentId"

            ,nativeQuery = true
    )
    Optional<List<Resume>> findAllResume(String studentId);
    @Query(value = "INSERT INTO resume (id,user_id,number,school)  VALUES(:resumeId,:userId,:number,:school)", nativeQuery = true)
    Optional saveBasicResume(String resumeId, String userId, int number, School school);

    Resume findByStudentIdAndResumeId(String studentId,String resumeId);
}
