package com.example.demo.dao;

import com.example.demo.dto.StudentDto;
import com.example.demo.model.TeacherFile;
import com.example.demo.rowmapper.StudentDtoRowMapper;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Component
public class TeacherDao {
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    public List<TeacherFile> findByFileType(String fileType, int limit, int offset){
        List<TeacherFile> teacherFiles = new ArrayList<>();
        String sql = "SELECT * FROM teacher_file WHERE 1=1 ";
        Map<String, Object> params = new HashMap<>();


        params.put("limit", limit);
        params.put("offset", offset);

        if (fileType != null) {
            fileType = "%" + fileType + "%";
            sql += " AND teacher_file_type LIKE :fileType";
            params.put("fileType", fileType);
        }
        sql += "LIMIT :limit OFFSET :offset";

        // 使用自定义的RowMapper将查询结果映射到TeacherFile对象
        teacherFiles = namedParameterJdbcTemplate.query(sql, params, (rs, rowNum) -> {
            TeacherFile teacherFile = new TeacherFile();
            teacherFile.setTeacherFileId(rs.getString("teacher_file_id"));
            teacherFile.setTeacherId(rs.getString("teacher_id"));
            teacherFile.setTeacherFilePath(rs.getString("teacher_file_path"));
            teacherFile.setTeacherFileName(rs.getString("teacher_file_name"));
            teacherFile.setTeacherFileTalk(rs.getString("teacher_file_talk"));
            teacherFile.setTeacherFileType(rs.getString("teacher_file_type"));
            teacherFile.setTeacherFileUrl(rs.getString("teacher_file_url"));
            teacherFile.setTeacherFileTitle(rs.getString("teacher_file_title"));
            if(rs.getDate("update_time") != null){
                teacherFile.setUpdateTime(rs.getDate("update_time").toLocalDate());
            }else{
                teacherFile.setUpdateTime(null);
            }
            if(rs.getDate("create_time") != null){
                teacherFile.setCreateTime(rs.getDate("create_time").toLocalDate());
            }else{
                teacherFile.setCreateTime(null);
            }

            return teacherFile;
        });

        return teacherFiles;
    }
}
