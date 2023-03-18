//package com.example.demo.dao.vacancies;
//
//import lombok.AllArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
//import org.springframework.stereotype.Component;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//
//@AllArgsConstructor
//@Component
//public class VacanciesDao {
//
//    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
//
//    public List<Object> getPageVacancies(List<String> technology, String order, String county,String salaryType, Long salaryMax, int salaryMin, int page, int limit){
//        String sql = "SELECT v.vacancies_id, v.teacher_id, v.vacancies_name, v.vacancies_time, v.vacancies_county,\n" +
//                " v.vacancies_content, v.vacancies_work_experience, v.vacancies_Education, v.vacancies_department,\n" +
//                " v.vacancies_other, v.teacher_watch, v.vacancies_quantity, v.vacancies_create_time,\n" +
//                " v.vacancies_end_time, v.apply_count, v.vacancies_condition,  v.vacancies_skill, v.vacancies_view\n" +
//                " ,v.vacancies_down_salary,v.vacancies_top_salary,v.vacancies_salary_type FROM vacancies v INNER JOIN company c ON c.company_id = v.company_id WHERE 1=1";
//        if (technology != null && !technology.isEmpty()) {
//            for (String tech : technology) {
//                if(tech.isEmpty()){
//                    String technology1 = technology.stream()
//                            .map(value->"( v.vacancies_skill LIKE '%" + value + "%'")
//                            .collect(Collectors.joining(" AND "));
//                    technology1 = "AND "+ technology1+") ";
//                    sql =sql + technology1;
//                }
//            }
//        }
//        if(county!=null){
//            sql = sql + " AND v.vacancies_county = " + "'"+county + "'";
//        }
//        if( salaryType != null){
//            sql = sql + " And v.vacancies_salary_type = " +"'"+salaryType+"'";
//        }
//        if( salaryMax > 0){
//            sql = sql + " And v.vacancies_top_salary < " + salaryMax;
//        }if( salaryMin > 0){
//            sql = sql + " And v.vacancies_down_salary > " + salaryMin;
//        }
//        if(order != null){
//            sql = sql +  " order by " + order;
//        }
//        if(limit != 0 && page != 0 ){
//            sql = sql + " limit " + (page - 1)+","+limit;
//        }
//        System.out.println(sql);
//        return namedParameterJdbcTemplate.query(sql,);
//    }
//}
