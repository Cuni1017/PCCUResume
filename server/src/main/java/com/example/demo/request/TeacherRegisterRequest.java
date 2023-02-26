package com.example.demo.request;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeacherRegisterRequest {

    private String teacherId;

    private String teacherUsername;

    private String teacherPassword;

    private String teacherName;

    private String teacherEmail;
}
