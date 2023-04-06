package com.example.demo.dto.vacancies;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class LoginStudentDto {
    private String studentId;
    private String studentName;
    private String studentUsername;
    private String studentImageUrl;
    private String pccuId;
    private String role;
}
