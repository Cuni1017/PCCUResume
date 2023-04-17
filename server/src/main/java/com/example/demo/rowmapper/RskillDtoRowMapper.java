package com.example.demo.rowmapper;

import com.example.demo.dto.RestDto;
import com.example.demo.dto.resume.RSkillDto;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RskillDtoRowMapper implements RowMapper<RSkillDto> {


    @Override
    public RSkillDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        RSkillDto rSkillDto = new RSkillDto();
        rSkillDto.setRSkillId(rs.getString("r_skill_id"));
        rSkillDto.setSkillId(rs.getString("skill_id"));
        rSkillDto.setSkillName(rs.getString("skill_name"));
        return rSkillDto;
    }
}
