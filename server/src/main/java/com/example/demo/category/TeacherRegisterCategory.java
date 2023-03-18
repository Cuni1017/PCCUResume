package com.example.demo.category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeacherRegisterCategory {

    private String teacherId;

    private String teacherUsername;

    private String teacherPassword;

    private String teacherName;

    private String teacherEmail;
}
