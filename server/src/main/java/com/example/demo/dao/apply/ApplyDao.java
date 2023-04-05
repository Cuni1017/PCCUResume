package com.example.demo.dao.apply;

import com.example.demo.category.ChangeApplyTypeCategory;
import com.example.demo.dto.ApplyUserDto;
import com.example.demo.dto.applyforjob.ApplyCompanyDto;
import com.example.demo.dto.vacancies.CompanyVacanciesDto;
import com.example.demo.model.vacancies.Vacancies;
import com.example.demo.rowmapper.ApplyCompanyRowMapper;
import com.example.demo.rowmapper.ApplyUserRowMapper;
import com.example.demo.rowmapper.CompanyVacanciesRowMapper;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Component
public class ApplyDao {
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public  ApplyCompanyDto findByVacanciesId(String vacanciesId) {
        String sql = "SELECT c.company_id, c.company_name, c.company_image_url,\n" +
                " v.vacancies_id, v.vacancies_name \n" +
                "  FROM vacancies v INNER JOIN company c ON c.company_id = v.company_id\n" +
                "  WHERE v.vacancies_id = :vacanciesId";
        Map<String,Object> map= new HashMap<>();
        map.put("vacanciesId",vacanciesId);

        return namedParameterJdbcTemplate.queryForObject(sql,map, new ApplyCompanyRowMapper());
    }
    public List<ApplyUserDto> findUserAndApplies(String vacanciesId, String applyType){
        Map<String,Object> map= new HashMap<>();
        String sql = "SELECT a.apply_id,a.vacancies_id,a.user_id,a.create_time,\n" +
                "a.apply_type,a.company_id,a.resume_id, s.student_name \n" +
                "  FROM apply a INNER JOIN student s ON a.user_id = s.student_id\n" +
                "  WHERE a.vacancies_id = :vacanciesId";

        if(applyType != null){
            sql = sql + " AND a.apply_type = :applyType";

            map.put("applyType",applyType);
            System.out.println(sql);
        }

        map.put("vacanciesId",vacanciesId);

        return namedParameterJdbcTemplate.query(sql,map, new ApplyUserRowMapper());
    }
    public List<CompanyVacanciesDto> getCompanyVacanciesByCompanyName(String companyName, int selectLimit, int selectOffset){
        String sql ="SELECT c.company_id, c.company_name, c.company_image_url,\n"+
                "v.vacancies_id, v.teacher_id, v.vacancies_name, v.vacancies_time, v.vacancies_description,v.vacancies_requirement,\n"+
                "v.vacancies_work_experience, v.vacancies_Education, v.vacancies_department,\n"+
                "v.vacancies_quantity, v.vacancies_create_time,v.vacancies_end_time, v.apply_count,v.teacher_valid_type,v.vacancies_watch_type,\n"+
                "group_concat(DISTINCT s.skill_name) skills, group_concat(DISTINCT ct.county_name) county,\n"+
                "v.vacancies_view,v.vacancies_down_salary,v.vacancies_top_salary,v.vacancies_salary_type\n"+
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

}
