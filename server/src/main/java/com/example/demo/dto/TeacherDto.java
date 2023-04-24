package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class TeacherDto {
    private String teacherId;
    private String teacherUsername;
    private String teacherName;
    private String teacherImageUrl;
    private String role;
}
