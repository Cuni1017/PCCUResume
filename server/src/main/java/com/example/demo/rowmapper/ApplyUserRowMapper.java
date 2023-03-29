package com.example.demo.rowmapper;

import com.example.demo.dto.ApplyUserDto;
import com.example.demo.dto.vacancies.CompanyVacanciesDto;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLOutput;

public class ApplyUserRowMapper implements RowMapper<ApplyUserDto> {
    @Override
    public ApplyUserDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        ApplyUserDto applyUserDto = new  ApplyUserDto();
        applyUserDto.setApplyId(rs.getString("apply_id"));
        applyUserDto.setVacanciesId(rs.getString("vacancies_id"));
        applyUserDto.setUserId(rs.getString("user_id"));
        applyUserDto.setCreateTime(rs.getDate("create_time").toLocalDate());
        applyUserDto.setApplyType(rs.getString("apply_type"));
        applyUserDto.setCompanyId(rs.getString("company_id"));
        applyUserDto.setResumeId(rs.getString("resume_id"));
        applyUserDto.setStudentRealName(rs.getString("student_name"));
        System.out.println(applyUserDto );
        return  applyUserDto;

    }
}