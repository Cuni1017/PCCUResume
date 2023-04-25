package com.example.demo.rowmapper;

import com.example.demo.dto.StudentDto;
import com.example.demo.dto.resume.RSkillDto;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class StudentDtoRowMapper implements RowMapper<StudentDto> {
    @Override
    public StudentDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        StudentDto studentDto = new StudentDto();
        studentDto.setStudentId(rs.getString("student_id"));
        studentDto.setStudentEmail(rs.getString("student_email"));
        studentDto.setStudentImageUrl(rs.getString("student_image_url"));
        studentDto.setStudentName(rs.getString("student_name"));
        studentDto.setStudentNumber(rs.getString("student_number"));
        studentDto.setStudentUsername(rs.getString("student_username"));
        studentDto.setRole(rs.getString("role"));
        return studentDto;
    }
}
