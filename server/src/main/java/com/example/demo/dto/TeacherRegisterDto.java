package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeacherRegisterDto {

    private String teacherId;

    private String teacherUsername;

    private String teacherPassword;

    private String teacherName;

    private String teacherEmail;
}
