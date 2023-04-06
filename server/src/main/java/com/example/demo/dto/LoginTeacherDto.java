package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginTeacherDto {
    private String teacherId;
    private String teacherUsername;
    private String teacherName;
    private String teacherEmail;
    private String role;
}
