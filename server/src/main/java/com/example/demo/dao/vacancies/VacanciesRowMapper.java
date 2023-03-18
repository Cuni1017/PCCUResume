//package com.example.demo.dao.vacancies;
//
//
//import com.example.demo.model.vacancies.Vacancies;
//import org.springframework.jdbc.core.RowMapper;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//
//public class VacanciesRowMapper implements RowMapper<Vacancies> {
//
//    @Override
//    public Vacancies mapRow(ResultSet rs, int rowNum) throws SQLException {
//        Vacancies vacancies = new Vacancies();
//        vacancies.setVacanciesId(rs.getLong("vacancies_id"));
//        vacancies.setTeacherId(rs.getString("teacher_id"));
//        vacancies.setVacanciesName(rs.getString("vacancies_name"));
//        vacancies.setVacanciesTime(rs.getDate("vacancies_time"));
//        vacancies.setVacanciesCounty(rs.getString("vacancies_county"));
//        vacancies.setVacanciesContent(rs.getString("vacancies_content"));
//        vacancies.setVacanciesWorkExperience(rs.getString("vacancies_work_experience"));
//        vacancies.setVacanciesEducation(rs.getString("vacancies_Education"));
//        vacancies.setVacanciesDepartment(rs.getString("vacancies_department"));
//        vacancies.setVacanciesOther(rs.getString("vacancies_other"));
//        vacancies.setTeacherWatch(rs.getString("teacher_watch"));
//        vacancies.setVacanciesQuantity(rs.getInt("vacancies_quantity"));
//        vacancies.setVacanciesCreateTime(rs.getDate("vacancies_create_time"));
//        vacancies.setVacanciesEndTime(rs.getDate("vacancies_end_time"));
//        vacancies.setApplyCount(rs.getLong("apply_count"));
//        vacancies.setVacanciesCondition(rs.getString("vacancies_condition"));
//        vacancies.setVacanciesSkill(rs.getString("vacancies_skill"));
//        vacancies.setVacanciesView(rs.getLong("vacancies_view"));
//        vacancies.setVacanciesTopSalary(rs.getLong("vacancies_top_salary"));
//        vacancies.setVacanciesDownSalary(rs.getLong("vacancies_down_salary"));
//        vacancies.setVacanciesSalaryType(rs.getString("vacancies_salary_type"));
//        return vacancies;
//    }
//}
