//package com.example.demo.dao;
//
//import com.example.demo.model.Student;
//import com.example.demo.rowmapper.CompanyVacanciesRowMapper;
//import lombok.AllArgsConstructor;
//import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
//import org.springframework.stereotype.Component;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@AllArgsConstructor
//@Component
//public class StudentDao {
//    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
////    List<Student>  findByRole(String role, int limit, int offset,String search){
////        String sql = "select s.*from Student s inner join user u on s.student_id = u.id \n " +
////                "where 1 = 1 ";
////        Map<String,Object> map= new HashMap<>();
////        if( role != null){
////            sql = sql + " AND u.role = :role";
////        }
////        if( search != null){
////            sql = sql + " AND (s.student_name = :search OR s.pccu_id = :search)";
////        }
////        sql = sql + " LIMIT :limit OFFSET :offset";
////        return namedParameterJdbcTemplate.query(sql,map,new CompanyVacanciesRowMapper());
////    }
//}
