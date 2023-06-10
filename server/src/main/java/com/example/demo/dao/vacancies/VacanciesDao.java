 package com.example.demo.dao.vacancies;

import com.example.demo.dto.CompanyVacanciesDto;
import com.example.demo.dto.vacancies.FullVacanciesDto;
import com.example.demo.model.TeacherValidType;
import com.example.demo.model.vacancies.Vacancies;
import com.example.demo.rowmapper.CompanyVacanciesRowMapper;
import com.example.demo.rowmapper.FullVacanciesRowMapper;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@AllArgsConstructor
@Component
public class VacanciesDao {
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private static final String COUNT_BEFORE = "SELECT count(*) FROM (";
    private static final String COUNT_AFTER = ") as s";



    public FullVacanciesDto findFullVacanciesById(String vacanciesId){
        String sql ="SELECT c.company_id,c.company_name,c.company_title,c.company_number,\n"+
                "c.company_county,c.company_district,c.company_address,c.company_email,c.company_image_url,v.*," +
                " group_concat(DISTINCT s.skill_name) skills, group_concat(DISTINCT ct.county_name) county\n"+
                "FROM vacancies v INNER JOIN company c ON c.company_id = v.company_id \n"+
                "LEFT JOIN vacancies_skill vs ON vs.vacancies_id = v.vacancies_id \n"+
                "LEFT JOIN skill s  ON s.skill_id = vs.skill_id \n"+
                "LEFT JOIN vacancies_county vc  ON vc.vacancies_id = v.vacancies_id \n"+
                "LEFT JOIN county ct  ON ct.county_id = vc.county_id \n"+
                "WHERE 1=1 AND  v.vacancies_id = :vacanciesId group by v.vacancies_id";

        Map<String,Object> map= new HashMap<>();

        map.put("vacanciesId",vacanciesId);
        System.out.println(sql);

        return
                namedParameterJdbcTemplate.queryForObject(sql,map,new FullVacanciesRowMapper());
    }


    public List<CompanyVacanciesDto> findPageVacancies(List<String> county,List<String> technology, String salaryType, Long salaryMax, int salaryMin, String order,int selectLimit, int selectOffset){
        String sql ="SELECT c.company_id, c.company_name, c.company_image_url,\n"+
                "v.vacancies_id, v.teacher_id, v.vacancies_name, v.vacancies_time, v.vacancies_description,v.vacancies_requirement,\n"+
                "v.vacancies_work_experience,v.vacancies_district ,v.vacancies_Education, v.vacancies_department,\n"+
                "v.vacancies_quantity, v.vacancies_create_time, v.apply_count,v.teacher_valid_type,v.vacancies_watch_type,\n"+
                "group_concat(DISTINCT s.skill_name) skills, group_concat(DISTINCT ct.county_name) county,\n"+
                "v.vacancies_view,v.vacancies_down_salary,v.vacancies_top_salary,v.vacancies_salary_type,v.vacancies_update_time\n"+
                "FROM vacancies v INNER JOIN company c ON c.company_id = v.company_id \n"+
                "LEFT JOIN vacancies_skill vs ON vs.vacancies_id = v.vacancies_id \n"+
                "LEFT JOIN skill s  ON s.skill_id = vs.skill_id \n"+
                "LEFT JOIN vacancies_county vc  ON vc.vacancies_id = v.vacancies_id \n"+
                "LEFT JOIN county ct  ON ct.county_id = vc.county_id \n"+
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

                sql = sql + " AND v.teacher_valid_type = '審核通過'";
                sql = sql + " AND v.vacancies_watch_type = '公開'";
                sql = sql + " group by v.vacancies_id";
                sql = sql + " LIMIT :limit";
                sql = sql + " OFFSET :offset";



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
    public List<CompanyVacanciesDto> findPageVacanciesReview(int selectLimit, int selectOffset,String search,String teacherValidType){
        String sql ="SELECT c.company_id, c.company_name, c.company_image_url,\n"+
                "v.vacancies_id, v.teacher_id, v.vacancies_name, v.vacancies_time, v.vacancies_description,v.vacancies_requirement,\n"+
                "v.vacancies_work_experience,v.vacancies_district ,v.vacancies_Education, v.vacancies_department,\n"+
                "v.vacancies_quantity, v.vacancies_create_time, v.apply_count,v.teacher_valid_type,v.vacancies_watch_type,v.vacancies_update_time,\n"+
                "group_concat(DISTINCT s.skill_name) skills, group_concat(DISTINCT ct.county_name) county,\n"+
                "v.vacancies_view,v.vacancies_down_salary,v.vacancies_top_salary,v.vacancies_salary_type\n"+
                "FROM vacancies v INNER JOIN company c ON c.company_id = v.company_id \n"+
                "LEFT JOIN vacancies_skill vs ON vs.vacancies_id = v.vacancies_id \n"+
                "LEFT JOIN skill s  ON s.skill_id = vs.skill_id \n"+
                "LEFT JOIN vacancies_county vc  ON vc.vacancies_id = v.vacancies_id \n"+
                "LEFT JOIN county ct  ON ct.county_id = vc.county_id \n"+
                "WHERE 1=1  ";
        if(teacherValidType != null){

            sql = sql +" AND v.teacher_valid_type = :teacherValidType ";
        }
        if(search!= null){
            search = "%" + search + "%";
            sql = sql + " AND (c.company_name like :search OR v.vacancies_name like :search)";
        }
        sql = sql + " group by v.vacancies_id";

        sql = sql + " LIMIT :limit OFFSET :offset";

        Map<String,Object> map= new HashMap<>();
        map.put("teacherValidType",teacherValidType);
        map.put("limit",selectLimit);
        map.put("offset",selectOffset);
        map.put("search",search);
        System.out.println(sql);
        return namedParameterJdbcTemplate.query(sql,map,new CompanyVacanciesRowMapper());
    }
    public List<CompanyVacanciesDto> findApplyVacanciesByVacanciesUpdateTime(LocalDate fiveDays, String teacherValidType){
        String sql ="SELECT c.company_id, c.company_name, c.company_image_url,\n"+
                "v.vacancies_id, v.teacher_id, v.vacancies_name, v.vacancies_time, v.vacancies_description,v.vacancies_requirement,\n"+
                "v.vacancies_work_experience,v.vacancies_district ,v.vacancies_Education, v.vacancies_department,\n"+
                "v.vacancies_quantity, v.vacancies_create_time, v.apply_count,v.teacher_valid_type,v.vacancies_watch_type,\n"+
                "group_concat(DISTINCT s.skill_name) skills, group_concat(DISTINCT ct.county_name) county,\n"+
                "v.vacancies_view,v.vacancies_down_salary,v.vacancies_top_salary,v.vacancies_salary_type,v.vacancies_update_time\n"+
                "FROM vacancies v INNER JOIN company c ON c.company_id = v.company_id \n"+
                "LEFT JOIN vacancies_skill vs ON vs.vacancies_id = v.vacancies_id \n"+
                "LEFT JOIN skill s  ON s.skill_id = vs.skill_id \n"+
                "LEFT JOIN vacancies_county vc  ON vc.vacancies_id = v.vacancies_id \n"+
                "LEFT JOIN county ct  ON ct.county_id = vc.county_id \n"+
                "WHERE 1=1  AND v.vacancies_update_time > :fiveDays ";
        if(teacherValidType != null){
            sql = sql +" AND v.teacher_valid_type = :teacherValidType";
        }
        sql = sql + " GROUP BY v.vacancies_id";
        Map<String,Object> map= new HashMap<>();
        map.put("fiveDays",fiveDays);
        map.put("teacherValidType",teacherValidType);
        System.out.println(sql);
        return namedParameterJdbcTemplate.query(sql,map,new CompanyVacanciesRowMapper());
    }

    public Integer findPageVacanciesCount(List<String> county,List<String> technology, String salaryType, Long salaryMax, int salaryMin, String order,int selectLimit, int selectOffset){
        String sql ="SELECT c.company_id, c.company_name, c.company_image_url,\n"+
                "v.vacancies_id, v.teacher_id, v.vacancies_name, v.vacancies_time, v.vacancies_description,v.vacancies_requirement,\n"+
                "v.vacancies_work_experience, v.vacancies_Education, v.vacancies_department,\n"+
                "v.vacancies_quantity, v.vacancies_create_time, v.apply_count,\n"+
                "group_concat(DISTINCT s.skill_name) skills, group_concat(DISTINCT ct.county_name) county,\n"+
                "v.vacancies_view,v.vacancies_down_salary,v.vacancies_top_salary,v.vacancies_salary_type,v.vacancies_update_time\n"+
                "FROM vacancies v INNER JOIN company c ON c.company_id = v.company_id \n"+
                "LEFT JOIN vacancies_skill vs ON vs.vacancies_id = v.vacancies_id \n"+
                "LEFT JOIN skill s  ON s.skill_id = vs.skill_id \n"+
                "LEFT JOIN vacancies_county vc  ON vc.vacancies_id = v.vacancies_id \n"+
                "LEFT JOIN county ct  ON ct.county_id = vc.county_id \n"+
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

        sql = sql + " AND v.teacher_valid_type = '審核通過'";
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


        sql = COUNT_BEFORE +sql + COUNT_AFTER;
        System.out.println(sql);
        System.out.println("total:"+namedParameterJdbcTemplate.queryForObject(sql,map,Integer.class));
        return namedParameterJdbcTemplate.queryForObject(sql,map,Integer.class);
    }
    public int updateVacancies(Vacancies vacancies){
        String sql = "UPDATE vacancies SET vacancies_name = :vacanciesName," +
                " vacancies_time = :vacanciesName , vacancies_work_experience = :vacanciesWorkExperience," +
                " vacancies_education = :vacanciesEducation,vacancies_department = :vacanciesDepartment," +
                " vacancies_other = :vacanciesOther , vacancies_safe = :vacanciesSafe," +
                " vacancies_district = :vacanciesDistrict, vacancies_address = :vacanciesAddress," +
                " vacancies_salary_type = :vacanciesSalaryType, vacancies_top_Salary = :vacanciesTopSalary," +
                " vacancies_down_Salary = :vacanciesDownSalary,vacancies_description = :vacanciesDescription," +
                " vacancies_requirement = :vacanciesRequirement ,vacancies_quantity = :vacanciesQuantity," +
                " teacher_valid_ype = '審核中',  vacancies_condition = :vacanciesCondition,vacancies_watch_type = :vacanciesWatchType";
        Map<String,Object> map= new HashMap<>();

        map.put("vacanciesId",vacancies.getVacanciesId());
        map.put("vacanciesName",vacancies.getVacanciesName());
        map.put("vacanciesWorkExperience",vacancies.getVacanciesWorkExperience());
        map.put("vacanciesEducation",vacancies.getVacanciesEducation());
        map.put("vacanciesDepartment",vacancies.getVacanciesDepartment());
        map.put("vacanciesOther",vacancies.getVacanciesOther());
        map.put("vacanciesSafe",vacancies.getVacanciesSafe());
        map.put("vacanciesDistrict",vacancies.getVacanciesDistrict());
        map.put("vacanciesAddress",vacancies);
        map.put("vacanciesSalaryType",vacancies);
        map.put("vacanciesTopSalary",vacancies);

        map.put("vacanciesDownSalary",vacancies);
        map.put("vacanciesDescription",vacancies);
        map.put("vacanciesRequirement",vacancies);
        map.put("vacanciesQuantity",vacancies);
        map.put("vacanciesCondition",vacancies);
        map.put("vacanciesWatchType",vacancies);

        int row =namedParameterJdbcTemplate.update(sql,map);
        return  row;
        }


}
