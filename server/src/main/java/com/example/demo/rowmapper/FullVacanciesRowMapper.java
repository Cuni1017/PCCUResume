package com.example.demo.rowmapper;

import com.example.demo.dto.vacancies.FullVacanciesDto;
import com.example.demo.model.Company;
import com.example.demo.model.vacancies.Vacancies;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FullVacanciesRowMapper implements RowMapper<FullVacanciesDto> {
    @Override
    public FullVacanciesDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        Company company = Company.builder()
                .companyId(rs.getString("company_id"))
                .companyName(rs.getString("company_name"))
                .companyImageUrl(rs.getString("company_image_url"))
                .companyTitle(rs.getString("company_title"))
                .companyNumber(rs.getInt("company_number"))
                .companyCounty(rs.getString("company_county"))
                .companyDistrict(rs.getString("company_district"))
                .companyAddress(rs.getString("company_address"))
                .companyEmail(rs.getString("company_email"))
                .build();

        Vacancies vacancies = Vacancies.builder()
                .vacanciesId(rs.getString("vacancies_id"))
                .companyId(rs.getString("company_id"))
                .teacherId(rs.getString("teacher_id"))
                .vacanciesName(rs.getString("vacancies_name"))
                .vacanciesTime(rs.getString("vacancies_time"))
                .vacanciesWorkExperience(rs.getString("vacancies_work_experience"))
                .vacanciesEducation(rs.getString("vacancies_education"))
                .vacanciesDepartment(rs.getString("vacancies_department"))
                .vacanciesOther(rs.getString("vacancies_other"))
                .vacanciesSafe(rs.getString("vacancies_safe"))
                .vacanciesCreateTime(rs.getDate("vacancies_create_time").toLocalDate())
                .vacanciesEndTime(rs.getDate("vacancies_end_time").toLocalDate())
                .vacanciesDistrict(rs.getString("vacancies_district"))
                .vacanciesAddress(rs.getString("vacancies_address"))
                .vacanciesSalaryType(rs.getString("vacancies_salary_type"))
                .vacanciesTopSalary(rs.getInt("vacancies_top_salary"))
                .vacanciesDownSalary(rs.getInt("vacancies_down_salary"))
                .vacanciesDescription(rs.getString("vacancies_description"))
                .vacanciesRequirement(rs.getString("vacancies_requirement"))
                .applyCount(rs.getInt("apply_count"))
                .vacanciesQuantity(rs.getInt("vacancies_quantity"))
                .vacanciesView(rs.getInt("vacancies_view"))
                .teacherValidType(rs.getString("teacher_valid_type"))
                .vacanciesCondition(rs.getString("vacancies_condition"))
                .vacanciesWatchType(rs.getString("vacancies_watch_type"))
                .build();
        String skills = rs.getString("skills");
        String county = rs.getString("county");
        FullVacanciesDto fullVacanciesDto=FullVacanciesDto.builder()
                .companyId(company.getCompanyId())
                .companyName(company.getCompanyName())
                .companyTitle(company.getCompanyTitle())
                .companyNumber(company.getCompanyNumber())
                .companyCounty(company.getCompanyCounty())
                .companyDistrict(company.getCompanyDistrict())
                .companyAddress(company.getCompanyAddress())
                .companyEmail(company.getCompanyEmail())
                .companyImageUrl(company.getCompanyImageUrl())
                .vacancies(vacancies)
                .skills(skills)
                .county(county)
                .build();
        return fullVacanciesDto;
    }
}
