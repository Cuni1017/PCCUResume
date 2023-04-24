package com.example.demo.dao.vacancies;

import com.example.demo.model.vacancies.Vacancies;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Repository
public interface VacanciesRepository extends JpaRepository<Vacancies,String>,PagingAndSortingRepository<Vacancies, String> {
    List<Vacancies> findByVacanciesUpdateTimeAfterAndTeacherValidType(LocalDate VacanciesUpdate,String TeacherValidType);

    void deleteByCompanyId(String companyId);
//    @Query(value = "SELECT c.company_id, c.company_name,\n" +
//            " v.vacancies_id, v.teacher_id, v.vacancies_name, v.vacancies_time, v.vacancies_county,\n" +
//            " v.vacancies_content, v.vacancies_work_experience, v.vacancies_Education, v.vacancies_department,\n" +
//            " v.vacancies_other, v.teacher_watch, v.vacancies_quantity, v.vacancies_create_time,\n" +
//            " v.vacancies_end_time, v.apply_count, v.vacancies_condition,  v.vacancies_skill, v.vacancies_view\n" +
//            " ,v.vacancies_down_salary,v.vacancies_top_salary,v.vacancies_salary_type FROM vacancies v INNER JOIN company c ON c.company_id = v.company_id  \n" +
//            " WHERE (:county IS NULL OR v.vacancies_county = :county) AND :technology ",nativeQuery = true)
//    List<Object> findAll(@Param("county") String county,@Param("technology") String technology);
//    @Query(value ="select * FROM vacancies where vacancies_skill in :technology ",nativeQuery = true)
//    Object find(@Param("technology") List<String> technology);
//Optional<Vacancies> findById(String id);
//@Query(value = "SELECT c.company_id, c.company_name, c.company_image_url,\n"+
//        "v.vacancies_id, v.teacher_id, v.vacancies_name, v.vacancies_time, v.vacancies_description,v.vacancies_requirement,\n"+
//        "v.vacancies_work_experience, v.vacancies_Education, v.vacancies_department,\n"+
//        "v.vacancies_quantity, v.vacancies_create_time,v.vacancies_end_time, v.apply_count,\n"+
//        "group_concat(DISTINCT s.skill_name) skills, group_concat(DISTINCT ct.county_name) countys,\n"+
//        "v.vacancies_view,v.vacancies_down_salary,v.vacancies_top_salary,v.vacancies_salary_type\n"+
//        "FROM vacancies v INNER JOIN company c ON c.company_id = v.company_id \n"+
//        "INNER JOIN vacancies_skill vs ON vs.vacancies_id = v.vacancies_id \n"+
//        "INNER JOIN skill s  ON s.skill_id = vs.skill_id \n"+
//        "INNER JOIN vacancies_county vc  ON vc.vacancies_id = v.vacancies_id \n"+
//        "INNER JOIN county ct  ON ct.county_id = vc.county_id \n"+
//        "WHERE s.skill_name IN :technology AND ct.county_name IN :county \n"+
//        "AND v.vacancies_down_salary >= :salaryMin AND  v.vacancies_top_salary <= :salaryMax \n"+
//        "AND v.vacancies_salary_type = :salaryType AND v.teacher_valid_type = '審核通過' AND v.vacancies_quantity > 0 \n"+
//        "group by v.vacancies_id ", nativeQuery = true)
//Page<Object> findPageVacancies(@Param("county")     List<String> county,
//                               @Param("technology") List<String> technology,
//                               @Param("salaryMin")  int salaryMin ,
//                               @Param("salaryMax")  Long salaryMax,
//                               @Param("salaryType") String salaryType,
//                               @Param("pageable")   Pageable pageable
//                    );





}
