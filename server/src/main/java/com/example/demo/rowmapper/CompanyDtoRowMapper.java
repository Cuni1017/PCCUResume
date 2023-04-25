package com.example.demo.rowmapper;

import com.example.demo.dto.CompanyDto;
import com.example.demo.dto.CompanyVacanciesDto;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CompanyDtoRowMapper implements RowMapper<CompanyDto> {
    @Override
    public CompanyDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        CompanyDto companyDto = new CompanyDto();
        companyDto.setCompanyId(rs.getString("company_id"));
        companyDto.setCompanyName(rs.getString("company_name"));
        companyDto.setCompanyImageUrl(rs.getString("company_image_url"));
        companyDto.setCompanyEmail(rs.getString("company_email"));
        companyDto.setCompanyNumber(rs.getInt("company_number"));
        companyDto.setCompanyTitle(rs.getString("company_title"));
        companyDto.setCompanyUsername(rs.getString("company_username"));
        companyDto.setCompanyCounty(rs.getString("company_county"));
        companyDto.setCompanyDistrict(rs.getString("company_address"));
        companyDto.setCompanyAddress(rs.getString("company_address"));
        companyDto.setRole(rs.getString("role"));
        return companyDto;
    }
}
