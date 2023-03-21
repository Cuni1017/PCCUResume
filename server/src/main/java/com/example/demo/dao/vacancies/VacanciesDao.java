package com.example.demo.dao.vacancies;

import com.example.demo.dto.vacancies.CompanyVacanciesDto;
import com.example.demo.rowmapper.CompanyVacanciesRowMapper;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@AllArgsConstructor
@Component
public class VacanciesDao {
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private static final String COUNT_BEFORE = "SELECT count(*) FROM (";
    private static final String COUNT_AFTER = ") as s";
    public List<CompanyVacanciesDto> findPageVacancies(List<String> county,List<String> technology, String salaryType, Long salaryMax, int salaryMin, String order,int selectLimit, int selectOffset){
        String sql ="SELECT c.company_id, c.company_name, c.company_image_url,\n"+
                "v.vacancies_id, v.teacher_id, v.vacancies_name, v.vacancies_time, v.vacancies_description,v.vacancies_requirement,\n"+
                "v.vacancies_work_experience, v.vacancies_Education, v.vacancies_department,\n"+
                "v.vacancies_quantity, v.vacancies_create_time,v.vacancies_end_time, v.apply_count,\n"+
                "group_concat(DISTINCT s.skill_name) skills, group_concat(DISTINCT ct.county_name) counties,\n"+
                "v.vacancies_view,v.vacancies_down_salary,v.vacancies_top_salary,v.vacancies_salary_type\n"+
                "FROM vacancies v INNER JOIN company c ON c.company_id = v.company_id \n"+
                "INNER JOIN vacancies_skill vs ON vs.vacancies_id = v.vacancies_id \n"+
                "INNER JOIN skill s  ON s.skill_id = vs.skill_id \n"+
                "INNER JOIN vacancies_county vc  ON vc.vacancies_id = v.vacancies_id \n"+
                "INNER JOIN county ct  ON ct.county_id = vc.county_id \n"+
                "WHERE 1=1 ";
                if(county != null){
                    sql = sql + " AND ct.county_name IN (:county)";
                }
                if(technology != null){
                    sql = sql + " AND s.skill_name IN (:technology)";
                }
                if(salaryType != null){
                    sql = sql + " AND v.vacancies_salary_type = :salaryType";
                }
                sql = sql + " AND v.vacancies_down_salary >= :salaryMin";
                sql = sql + " AND v.vacancies_top_salary <= :salaryMax";

                sql = sql + " AND v.vacancies_quantity > 0";

//                sql = sql + " AND v.teacher_valid_type = '審查通過'";
                sql = sql + " AND v.vacancies_watch_type = '公開'";
                sql = sql + " group by v.vacancies_id";
                sql = sql + " order by :order";
                sql = sql + " LIMIT :limit OFFSET :offset";

        Map<String,Object> map= new HashMap<>();
        map.put("county",county);
        map.put("technology",technology);
        map.put("salaryMin",salaryMin);
        map.put("salaryMax",salaryMax);
        map.put("salaryType",salaryType);
        map.put("limit",selectLimit);
        map.put("order",order);
        map.put("offset",selectOffset);
        System.out.println(sql);
        return namedParameterJdbcTemplate.query(sql,map,new CompanyVacanciesRowMapper());
    }
    public Integer findPageVacanciesCount(List<String> county,List<String> technology, String salaryType, Long salaryMax, int salaryMin, String order,int selectLimit, int selectOffset){
        String sql ="SELECT c.company_id, c.company_name, c.company_image_url,\n"+
                "v.vacancies_id, v.teacher_id, v.vacancies_name, v.vacancies_time, v.vacancies_description,v.vacancies_requirement,\n"+
                "v.vacancies_work_experience, v.vacancies_Education, v.vacancies_department,\n"+
                "v.vacancies_quantity, v.vacancies_create_time,v.vacancies_end_time, v.apply_count,\n"+
                "group_concat(DISTINCT s.skill_name) skills, group_concat(DISTINCT ct.county_name) counties,\n"+
                "v.vacancies_view,v.vacancies_down_salary,v.vacancies_top_salary,v.vacancies_salary_type\n"+
                "FROM vacancies v INNER JOIN company c ON c.company_id = v.company_id \n"+
                "INNER JOIN vacancies_skill vs ON vs.vacancies_id = v.vacancies_id \n"+
                "INNER JOIN skill s  ON s.skill_id = vs.skill_id \n"+
                "INNER JOIN vacancies_county vc  ON vc.vacancies_id = v.vacancies_id \n"+
                "INNER JOIN county ct  ON ct.county_id = vc.county_id \n"+
                "WHERE 1=1 ";
        if(county != null){
            sql = sql + " AND ct.county_name IN (:county)";
        }
        if(technology != null){
            sql = sql + " AND s.skill_name IN (:technology)";
        }
        sql = sql + " AND v.vacancies_down_salary >= :salaryMin";
        sql = sql + " AND v.vacancies_top_salary <= :salaryMax";
        sql = sql + " AND v.vacancies_salary_type = :salaryType";
        sql = sql + " AND v.vacancies_quantity > 0";
//                sql = sql + " AND v.teacher_valid_type = '審查通過'";
        sql = sql + " AND v.vacancies_watch_type = '公開'";
        sql = sql + " group by v.vacancies_id";
        sql = sql + " order by :order";
//        sql = sql + " LIMIT :limit OFFSET :offset";

        Map<String,Object> map= new HashMap<>();
        map.put("county",county);
        map.put("technology",technology);
        map.put("salaryMin",salaryMin);
        map.put("salaryMax",salaryMax);
        map.put("salaryType",salaryType);
        map.put("order",order);
//        map.put("limit",selectLimit);
//
//        map.put("offset",selectOffset);
        System.out.println(sql);
        sql = COUNT_BEFORE +sql + COUNT_AFTER;
        return namedParameterJdbcTemplate.queryForObject(sql,map,Integer.class);
    }

}
