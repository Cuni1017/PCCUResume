package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDto {
  private String studentId;
  private String studentName;
  private String studentUsername;
  private String studentEmail;
  private String studentNumber;
  private String studentImageUrl;
  private String pccuId;
  private String role;
}
