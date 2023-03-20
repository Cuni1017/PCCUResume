package com.example.demo.rowmapper;

import com.example.demo.dto.vacancies.CompanyVacanciesDto;
import com.example.demo.dto.vacancies.PageVacanciesDto;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CompanyVacanciesRowMapper implements RowMapper<CompanyVacanciesDto> {
    @Override
    public CompanyVacanciesDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        CompanyVacanciesDto companyVacanciesDto = new CompanyVacanciesDto();
        companyVacanciesDto .setCompanyId(rs.getString("company_id"));
        companyVacanciesDto .setCompanyName(rs.getString("company_name"));
        companyVacanciesDto .setCompanyImageUrl(rs.getString("company_image_url"));
        companyVacanciesDto .setVacanciesId(rs.getString("vacancies_id"));
        companyVacanciesDto .setTeacherId(rs.getString("teacher_id"));
        companyVacanciesDto .setVacanciesName(rs.getString("vacancies_name"));
        companyVacanciesDto .setVacanciesTime(rs.getString("vacancies_time"));
        companyVacanciesDto .setVacanciesDescription(rs.getString("vacancies_description"));
        companyVacanciesDto .setVacanciesRequirement(rs.getString("vacancies_requirement"));
        companyVacanciesDto .setVacanciesWorkExperience(rs.getString("vacancies_work_experience"));
        companyVacanciesDto .setVacanciesEducation(rs.getString("vacancies_education"));
        companyVacanciesDto .setVacanciesDepartment(rs.getString("vacancies_department"));
        companyVacanciesDto .setVacanciesQuantity(rs.getString("vacancies_quantity"));
        companyVacanciesDto .setVacanciesCreateTime(rs.getDate("vacancies_create_time"));
        companyVacanciesDto .setVacanciesEndTime(rs.getDate("vacancies_end_time"));
        companyVacanciesDto .setApplyCount(rs.getInt("apply_count"));
        companyVacanciesDto .setVacanciesView(rs.getInt("vacancies_view"));
        companyVacanciesDto .setVacanciesDownSalary(rs.getInt("vacancies_down_salary"));
        companyVacanciesDto .setVacanciesTopSalary(rs.getLong("vacancies_top_salary"));
        companyVacanciesDto .setVacanciesSalaryType(rs.getString("vacancies_salary_type"));
        companyVacanciesDto .setSkills(rs.getString("skills"));
        companyVacanciesDto .setCounties(rs.getString("counties"));
        return companyVacanciesDto ;
    }
}
