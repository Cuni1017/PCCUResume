package com.example.demo.dao;

import com.example.demo.dto.vacancies.PageVacanciesDto;
import com.example.demo.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@Repository
public interface CompanyRepository extends JpaRepository<Company,String> {
    Optional<Company> findByCompanyUsername(String companyUsername);
    //要改名字
    //MODEL層的COMPANY
    @Query(value ="SELECT c.company_id, c.company_name, c.company_image_url,\n"+
            "v.vacancies_id, v.teacher_id, v.vacancies_name, v.vacancies_time, v.vacancies_description,v.vacancies_requirement,\n"+
            "v.vacancies_work_experience, v.vacancies_Education, v.vacancies_department,\n"+
            "v.vacancies_quantity, v.vacancies_create_time,v.vacancies_end_time, v.apply_count,\n"+
            "group_concat(DISTINCT s.skill_name) skills, group_concat(DISTINCT ct.county_name) countys,\n"+
            "v.vacancies_view,v.vacancies_down_salary,v.vacancies_top_salary,v.vacancies_salary_type\n"+
            "FROM vacancies v INNER JOIN company c ON c.company_id = v.company_id \n"+
            "INNER JOIN vacancies_skill vs ON vs.vacancies_id = v.vacancies_id \n"+
            "INNER JOIN skill s  ON s.skill_id = vs.skill_id \n"+
            "INNER JOIN vacancies_county vc  ON vc.vacancies_id = v.vacancies_id \n"+
            "INNER JOIN county ct  ON ct.county_id = vc.county_id \n"+
            "WHERE c.company_id = :companyId \n"+
            "group by v.vacancies_id ", nativeQuery = true)
    List<Object[]> findVacancies(@Param("companyId") String companyId);

    Optional<Company> findByCompanyName(String companyName);
    @Query(value = "select s.* from company c inner join user u on u.id = c.company_id WHERE c.company_create_time > :createTime and u.role = :role",nativeQuery = true )
    List<Company> findByCreateTimeAfterAndRole(LocalDate createTime, String role);
    @Query(value = "select c.* from company c inner join user u on c.user_id = u.user_id where  u.role = :role",nativeQuery = true)
    List<Company> findByRole(String role);
}
