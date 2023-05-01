package com.example.demo.dao.company;

import com.example.demo.dto.CompanyDto;
import com.example.demo.dto.CompanyVacanciesDto;
import com.example.demo.model.Company;
import com.example.demo.rowmapper.CompanyDtoRowMapper;
import com.example.demo.rowmapper.CompanyVacanciesRowMapper;
import com.example.demo.rowmapper.StudentDtoRowMapper;

import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Component
public class CompanyDao {
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private static final String COUNT_BEFORE = "SELECT count(*) FROM (";
    private static final String COUNT_AFTER = ") as s";
    public List<CompanyVacanciesDto> getCompanyVacanciesByCompanyName(String companyName, int selectLimit, int selectOffset){
        String sql ="SELECT c.company_id, c.company_name, c.company_image_url,\n"+
                "v.vacancies_id, v.teacher_id, v.vacancies_name, v.vacancies_time, v.vacancies_description,v.vacancies_requirement,\n"+
                "v.vacancies_work_experience, v.vacancies_Education, v.vacancies_department,\n"+
                "v.vacancies_quantity, v.vacancies_create_time,v.vacancies_end_time,v.vacancies_district, v.apply_count,v.teacher_valid_type,v.vacancies_watch_type,\n"+
                "group_concat(DISTINCT s.skill_name) skills, group_concat(DISTINCT ct.county_name) county,\n"+
                "v.vacancies_view,v.vacancies_down_salary,v.vacancies_top_salary,v.vacancies_salary_type,v.vacancies_update_time\n"+
                "FROM vacancies v INNER JOIN company c ON c.company_id = v.company_id \n"+
                "INNER JOIN vacancies_skill vs ON vs.vacancies_id = v.vacancies_id \n"+
                "INNER JOIN skill s  ON s.skill_id = vs.skill_id \n"+
                "INNER JOIN vacancies_county vc  ON vc.vacancies_id = v.vacancies_id \n"+
                "INNER JOIN county ct  ON ct.county_id = vc.county_id \n"+
                "WHERE c.company_name = :companyName \n"+
                "group by v.vacancies_id LIMIT :limit OFFSET :offset";

        Map<String,Object> map= new HashMap<>();
        map.put("companyName",companyName);
        map.put("limit",selectLimit);
        map.put("offset",selectOffset);

        return namedParameterJdbcTemplate.query(sql,map,new CompanyVacanciesRowMapper());
    }
    public Integer getCompanyVacanciesCount(String companyName){
        String sql =
                "SELECT count(DISTINCT v.vacancies_id) \n"+
                        "FROM vacancies v INNER JOIN company c ON c.company_id = v.company_id \n"+
                        "INNER JOIN vacancies_skill vs ON vs.vacancies_id = v.vacancies_id \n"+
                        "INNER JOIN skill s  ON s.skill_id = vs.skill_id \n"+
                        "INNER JOIN vacancies_county vc  ON vc.vacancies_id = v.vacancies_id \n"+
                        "INNER JOIN county ct  ON ct.county_id = vc.county_id \n"+
                        "WHERE c.company_name = :companyName \n"+
                        "group by v.vacancies_id ";
        Map<String,Object> map= new HashMap<>();
        map.put("companyName",companyName);
        sql = COUNT_BEFORE + sql +COUNT_AFTER;
        Integer CompanyVacanciesCount =  namedParameterJdbcTemplate.queryForObject(sql,map,Integer.class);
        return CompanyVacanciesCount;
    }

    public List<CompanyDto> findByRole(String role, int limit, int offset , String search){
        String sql = "select c.*,u.* from company c inner join user u on c.company_id = u.id \n" +
                "where 1 = 1";
        Map<String,Object> map= new HashMap<>();
        if( role != null){
            sql = sql + " AND u.role = :role";
        }
        if( search != null){
            search = "%" + search + "%";
            sql = sql + " AND c.company_name LIKE :search ";
            System.out.println(sql);
        }
        sql = sql + " LIMIT :limit OFFSET :offset";
        map.put("role",role);
        map.put("limit",limit);
        map.put("offset",offset);
        map.put("search",search);
        return namedParameterJdbcTemplate.query(sql,map,new CompanyDtoRowMapper());
    }
}
