package com.example.demo.category;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class TeacherFileCategory {



    private String teacherFileName;

    private String teacherFileTalk;

    private String  teacherFileType;

}
