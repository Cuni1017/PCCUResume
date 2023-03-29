package com.example.demo.rowmapper;

import com.example.demo.dto.applyforjob.ApplyCompanyDto;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ApplyCompanyRowMapper implements RowMapper<ApplyCompanyDto> {
    @Override
    public ApplyCompanyDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        ApplyCompanyDto applyCompanyDto = new ApplyCompanyDto();
        applyCompanyDto.setVacanciesId(rs.getString("vacancies_id"));
        applyCompanyDto.setVacanciesName(rs.getString("vacancies_name"));
        applyCompanyDto.setCompanyId(rs.getString("company_id"));
        applyCompanyDto.setCompanyName(rs.getString("company_name"));
        applyCompanyDto.setCompanyImageUrl(rs.getString("company_image_url"));
        return  applyCompanyDto;
    }
}
