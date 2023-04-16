package com.example.demo.dao.resume;

import com.example.demo.dto.resume.RSkillDto;
import com.example.demo.model.resume.RSkill;
import com.example.demo.rowmapper.RskillDtoRowMapper;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Component
public class ResumeDao {
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    public List<RSkillDto> findByResumeId(String resumeId){
        String sql = "select rs.r_skill_id,s.* from RSkill rs inner join skill s on rs.skill_id = s.skill_id where rs.resume_id = :resumeId";
        Map<String,Object> map= new HashMap<>();
        map.put("resumeId",resumeId);
        return  namedParameterJdbcTemplate.query(sql,map, new RskillDtoRowMapper());

    }
    public void deleteById(String skillId){
        String sql = "Delete rs.* from r_skill rs where r_skill_id = :skillId";
        Map<String,Object> map= new HashMap<>();
        map.put("skillId",skillId);
        namedParameterJdbcTemplate.update(sql,map);
    }

    public void deleteByResumeId(String resumeId) {
        String sql = "Delete rs.* from r_skill rs where resume_id = :resumeId";
        Map<String,Object> map= new HashMap<>();
        map.put("resumeId",resumeId);
        namedParameterJdbcTemplate.update(sql,map);
    }
}
