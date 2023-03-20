package com.example.demo.dao.company;

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
public class CompanyDao {
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private static final String COUNT_BEFORE = "SELECT count(*) FROM (";
    private static final String COUNT_AFTER = ") as s";
    public List<CompanyVacanciesDto> getCompanyVacancies(String companyId, int selectLimit, int selectOffset){
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
                "WHERE c.company_id = :companyId \n"+
                "group by v.vacancies_id LIMIT :limit OFFSET :offset";

        Map<String,Object> map= new HashMap<>();
        map.put("companyId",companyId);
        map.put("limit",selectLimit);
        map.put("offset",selectOffset);

        return namedParameterJdbcTemplate.query(sql,map,new CompanyVacanciesRowMapper());
    }
    public Integer getCompanyVacanciesCount(String companyId){
        String sql =
                "SELECT count(DISTINCT v.vacancies_id) \n"+
                        "FROM vacancies v INNER JOIN company c ON c.company_id = v.company_id \n"+
                        "INNER JOIN vacancies_skill vs ON vs.vacancies_id = v.vacancies_id \n"+
                        "INNER JOIN skill s  ON s.skill_id = vs.skill_id \n"+
                        "INNER JOIN vacancies_county vc  ON vc.vacancies_id = v.vacancies_id \n"+
                        "INNER JOIN county ct  ON ct.county_id = vc.county_id \n"+
                        "WHERE c.company_id = :companyId \n"+
                        "group by v.vacancies_id ";
        Map<String,Object> map= new HashMap<>();
        map.put("companyId",companyId);
        sql = COUNT_BEFORE + sql +COUNT_AFTER;
        Integer CompanyVacanciesCount =  namedParameterJdbcTemplate.queryForObject(sql,map,Integer.class);
        return CompanyVacanciesCount;
    }
}
